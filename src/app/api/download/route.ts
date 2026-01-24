import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');
    const filename = searchParams.get('filename') || 'video.mp4';

    if (!url) {
        return NextResponse.json({ error: 'Missing URL' }, { status: 400 });
    }

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch file');

        const headers = new Headers();
        headers.set('Content-Disposition', `attachment; filename="${filename}"`);
        headers.set('Content-Type', response.headers.get('Content-Type') || 'application/octet-stream');

        return new NextResponse(response.body, {
            status: 200,
            headers: headers,
        });
    } catch (error) {
        console.error("Download Proxy Error:", error);
        return NextResponse.json({ error: 'Download failed' }, { status: 500 });
    }
}
