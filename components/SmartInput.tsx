"use client";

import { useState, useCallback } from "react";

interface SmartInputProps {
  type?: "text" | "number";
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  formatDisplay?: (value: string) => string;
  parseInput?: (display: string) => string;
  className?: string;
  inputClassName?: string;
  onFocusCustom?: () => void;
  onBlurCustom?: () => void;
}

/**
 * SmartInput - 智能输入框组件
 * 
 * UX 设计原则：
 * - 当有默认值显示时，点击/focus 自动清空
 * - 用户输入时正常工作
 * - 如果用户清空并离开，保留空状态（不恢复默认值）
 * 
 * 这个设计让用户可以：
 * 1. 一眼看到示例值（placeholder/默认值）
 * 2. 点击时立即开始输入自己的值
 * 3. 不需要手动选中/删除默认值
 */
export default function SmartInput({
  type = "text",
  value,
  onChange,
  placeholder,
  formatDisplay,
  parseInput,
  className = "",
  inputClassName = "",
  onFocusCustom,
  onBlurCustom,
}: SmartInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // 处理 focus - 清空方便用户输入
  const handleFocus = useCallback(() => {
    setIsFocused(true);
    if (!hasInteracted && placeholder) {
      onChange("");
    }
    onFocusCustom?.();
  }, [hasInteracted, placeholder, onChange, onFocusCustom]);

  // 处理 blur
  const handleBlur = useCallback(() => {
    setIsFocused(false);
    onBlurCustom?.();
  }, [onBlurCustom]);

  // 处理输入变化
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setHasInteracted(true);
    const rawValue = e.target.value;
    
    if (parseInput) {
      // 如果有解析函数（如去掉千分位），先解析再传给 onChange
      const parsed = parseInput(rawValue);
      onChange(parsed);
    } else {
      onChange(rawValue);
    }
  }, [parseInput, onChange]);

  // 显示值 - 始终应用格式化（包括输入过程中）
  const displayValue = (() => {
    if (formatDisplay && value) {
      return formatDisplay(value);
    }
    return value;
  })();

  return (
    <div className={className}>
      <input
        type={type}
        value={displayValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        className={inputClassName}
      />
    </div>
  );
}

// 数字输入专用版本 - 自动处理丹麦数字格式
interface SmartNumberInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  thousandSeparator?: string;
}

export function SmartNumberInput({
  value,
  onChange,
  placeholder = "0",
  className = "",
  inputClassName = "",
  thousandSeparator = ".",
}: SmartNumberInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  // 格式化显示值（支持输入时实时格式化）
  const formatDisplay = (val: string, focused: boolean): string => {
    if (!val) return "";
    // 只格式化纯数字（不接受负号、小数点等）
    const digitsOnly = val.replace(/[^0-9]/g, "");
    if (!digitsOnly) return val;
    const num = parseInt(digitsOnly, 10);
    if (isNaN(num)) return val;
    // 输入时（focus）也格式化，不再区分 blur
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator);
  };

  const parseInput = (display: string): string => {
    // 去掉所有千分位符号和非数字字符
    return display.replace(/\./g, "").replace(/[^0-9]/g, "");
  };

  return (
    <SmartInput
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      formatDisplay={(val) => formatDisplay(val, isFocused)}
      parseInput={parseInput}
      className={className}
      inputClassName={inputClassName}
      onFocusCustom={() => setIsFocused(true)}
      onBlurCustom={() => setIsFocused(false)}
    />
  );
}
