import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, link, hasImage, language, timestamp } = body;

    // 验证必填字段
    if (!text || text.trim() === '') {
      return NextResponse.json(
        { error: 'Feedback text is required' },
        { status: 400 }
      );
    }

    // 创建反馈数据
    const feedback = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: timestamp || new Date().toISOString(),
      text: text.trim(),
      link: link || '',
      hasImage: hasImage || false,
      language: language || 'da'
    };

    // 确保反馈目录存在
    const feedbackDir = join(process.cwd(), 'feedback');
    try {
      await mkdir(feedbackDir, { recursive: true });
    } catch (err) {
      // 目录可能已存在，忽略错误
    }

    // 保存反馈为 JSON 文件
    const fileName = `feedback_${Date.now()}.json`;
    const filePath = join(feedbackDir, fileName);

    await writeFile(filePath, JSON.stringify(feedback, null, 2), 'utf-8');

    return NextResponse.json({
      success: true,
      message: 'Feedback received successfully',
      feedbackId: feedback.id
    });

  } catch (error) {
    console.error('Error processing feedback:', error);
    return NextResponse.json(
      { error: 'Failed to process feedback' },
      { status: 500 }
    );
  }
}
