import { Tool } from '../tools';

export const VIDEO_TOOLS: Tool[] = [
    {
        id: 'video-trimmer',
        title: 'Video Trimmer',
        description: 'Cut and trim your videos to the perfect length.',
        iconName: 'Video',
        category: 'Video',
        href: '/video/video-trimmer',
        type: 'file-to-file',
        seoTitle: 'Video Trimmer - Cut Video Online for Free',
        seoDescription: 'Easily trim MP4, MOV, and AVI videos in your browser.',
        keywords: ['Video Trimmer', 'Cut Video', 'Video Cutter'],
        content: {
            title: 'How to Trim Video Online',
            description: 'Select the start and end points to cut your video instantly.',
            steps: ['Upload video', 'Select range', 'Trim', 'Download'],
            features: ['High precision', 'Fast', 'No upload needed']
        }
    },
    {
        id: 'mute-video',
        title: 'Mute Video',
        description: 'Remove audio from any video file completely.',
        iconName: 'Video',
        category: 'Video',
        href: '/video/mute-video',
        type: 'file-to-file',
        seoTitle: 'Mute Video - Remove Audio from Video (Free)',
        seoDescription: 'Create silent videos by stripping away the audio track.',
        keywords: ['Mute Video', 'Remove Audio', 'Silent Video'],
        content: {
            title: 'How to Mute Video',
            description: 'One-click audio removal for all major video formats.',
            steps: ['Upload video', 'Process', 'Download silent file'],
            features: ['Fast', 'Private', 'HQ video']
        }
    },
    {
        id: 'video-to-gif',
        title: 'Video to GIF',
        description: 'Convert video clips into animated GIF files.',
        iconName: 'Zap',
        category: 'Video',
        href: '/video/video-to-gif',
        type: 'file-to-file',
        seoTitle: 'Video to GIF - Create Animated GIFs (Free)',
        seoDescription: 'Turn your favorite video moments into shareable GIFs.',
        keywords: ['Video to GIF', 'Make GIF', 'MP4 to GIF'],
        content: {
            title: 'How to Convert Video to GIF',
            description: 'Transform short clips into looping animations.',
            steps: ['Upload video', 'Select segment', 'Generate GIF', 'Download'],
            features: ['High quality', 'Fast', 'Custom FPS']
        }
    },
    {
        id: 'resize-video',
        title: 'Resize Video',
        description: 'Change video dimensions for Social Media (TikTok, IG, YT).',
        iconName: 'Video',
        category: 'Video',
        href: '/video/resize-video',
        type: 'file-to-file',
        seoTitle: 'Resize Video - Change Resolution Online (Free)',
        seoDescription: 'Scale your videos for different platforms instantly.',
        keywords: ['Resize Video', 'Scale Video', 'Video Aspect Ratio'],
        content: {
            title: 'How to Resize Video',
            description: 'Adjust your video resolution for any use case.',
            steps: ['Upload video', 'Select preset/custom', 'Process', 'Download'],
            features: ['Social presets', 'Fast', 'Secure']
        }
    },
    {
        id: 'compress-video',
        title: 'Compress Video',
        description: 'Reduce video file size without significant quality loss.',
        iconName: 'Video',
        category: 'Video',
        href: '/video/compress-video',
        type: 'file-to-file',
        seoTitle: 'Compress Video - Reduce MP4 Size Online (Free)',
        seoDescription: 'Shrink massive video files for easier sharing.',
        keywords: ['Compress Video', 'Reduce Video Size', 'Shrink MP4'],
        content: {
            title: 'How to Compress Video',
            description: 'Optimize video bitrate and resolution to save space.',
            steps: ['Upload video', 'Select quality', 'Compress', 'Download'],
            features: ['Smart compression', 'HQ results', 'Fast']
        }
    },
    {
        id: 'extract-audio',
        title: 'Extract Audio (MP3)',
        description: 'Save the audio track from any video as an MP3 file.',
        iconName: 'Zap',
        category: 'Video',
        href: '/video/extract-audio',
        type: 'file-to-file',
        seoTitle: 'Extract Audio - Video to MP3 Converter (Free)',
        seoDescription: 'Get the sound from your videos in high-quality MP3.',
        keywords: ['Extract Audio', 'Video to MP3', 'Audio Extractor'],
        content: {
            title: 'How to Extract Audio',
            description: 'Perfect for turning music videos into audio files.',
            steps: ['Upload video', 'Select format (MP3/WAV)', 'Extract', 'Download'],
            features: ['High bitrate', 'Fast', 'Universal support']
        }
    },
    {
        id: 'video-to-mp4',
        title: 'Video to MP4',
        description: 'Convert any video format to the universally accepted MP4.',
        iconName: 'Video',
        category: 'Video',
        href: '/video/to-mp4',
        type: 'file-to-file',
        seoTitle: 'Video to MP4 - Universal Video Converter (Free)',
        seoDescription: 'Ensure compatibility by converting to MP4 format.',
        keywords: ['Video to MP4', 'MP4 Converter', 'Fix Video Format'],
        content: {
            title: 'How to Convert Video to MP4',
            description: 'Fast H.264/AAC encoding for your digital videos.',
            steps: ['Upload file', 'Convert', 'Download MP4'],
            features: ['Optimized for web', 'Fast', 'Free']
        }
    },
    {
        id: 'mkv-to-mp4',
        title: 'MKV to MP4',
        description: 'Convert MKV files to MP4 for playability on all devices.',
        iconName: 'Video',
        category: 'Video',
        href: '/video/mkv-to-mp4',
        type: 'file-to-file',
        seoTitle: 'MKV to MP4 - Convert Video Online (Free)',
        seoDescription: 'Turn heavy MKV containers into standard MP4 files.',
        keywords: ['MKV to MP4', 'MKV Converter', 'Play MKV'],
        content: {
            title: 'How to Convert MKV to MP4',
            description: 'Seamlessly remux or transcode MKV to MP4.',
            steps: ['Upload MKV', 'Convert', 'Download MP4'],
            features: ['Preserve quality', 'Fast', 'Secure']
        }
    },
    {
        id: 'mov-to-mp4',
        title: 'MOV to MP4',
        description: 'Convert Apple QuickTime MOV files to MP4.',
        iconName: 'Video',
        category: 'Video',
        href: '/video/mov-to-mp4',
        type: 'file-to-file',
        seoTitle: 'MOV to MP4 - Convert QuickTime Video (Free)',
        seoDescription: 'Make your iPhone/Mac MOV videos compatible everywhere.',
        keywords: ['MOV to MP4', 'QuickTime Converter', 'iPhone Video'],
        content: {
            title: 'How to Convert MOV to MP4',
            description: 'Standardize your Apple video assets for sharing.',
            steps: ['Upload MOV', 'Convert', 'Download MP4'],
            features: ['Lossless remux', 'Fast', 'Free']
        }
    },
    {
        id: 'change-video-speed',
        title: 'Change Video Speed',
        description: 'Create slow-motion or fast-forward video effects.',
        iconName: 'Zap',
        category: 'Video',
        href: '/video/speed',
        type: 'file-to-file',
        seoTitle: 'Video Speed Changer - SlowMo & Fast Forward',
        seoDescription: 'Adjust video playback speed for creative effects.',
        keywords: ['Video Speed', 'Slow Motion', 'Fast Forward'],
        content: {
            title: 'How to Change Video Speed',
            description: 'Speed up or slow down your video clips instantly.',
            steps: ['Upload video', 'Select multiplier (0.5x, 2x)', 'Save', 'Download'],
            features: ['Audio pitch correction', 'Fast', 'Secure']
        }
    },
    {
        id: 'reverse-video',
        title: 'Reverse Video',
        description: 'Play your videos backwards for a fun effect.',
        iconName: 'Video',
        category: 'Video',
        href: '/video/reverse',
        type: 'file-to-file',
        seoTitle: 'Reverse Video - Backwards Video Maker (Free)',
        seoDescription: 'Flip your video timeframe to create unique content.',
        keywords: ['Reverse Video', 'Play Backwards', 'Rewind Video'],
        content: {
            title: 'How to Reverse Video',
            description: 'Invert the timeline of your video projects.',
            steps: ['Upload video', 'Process', 'Download reversed file'],
            features: ['Looping support', 'Fast', 'Free']
        }
    },
    {
        id: 'audio-joiner',
        title: 'Audio Joiner',
        description: 'Merge multiple audio files into a single track.',
        iconName: 'Zap',
        category: 'Video',
        href: '/video/audio-joiner',
        type: 'file-to-file',
        seoTitle: 'Audio Joiner - Merge Songs Online (Free)',
        seoDescription: 'Combine MP3, WAV, and OGG files into one.',
        keywords: ['Audio Joiner', 'Merge Audio', 'Join MP3'],
        content: {
            title: 'How to Join Audio Files',
            description: 'Create seamless mixes or join voice recordings.',
            steps: ['Upload tracks', 'Arrange order', 'Join', 'Download'],
            features: ['Fading options', 'Fast', 'Universal']
        }
    },
    {
        id: 'audio-cutter',
        title: 'Audio Cutter',
        description: 'Cut MP3 or other audio files to create ringtones.',
        iconName: 'Zap',
        category: 'Video',
        href: '/video/audio-cutter',
        type: 'file-to-file',
        seoTitle: 'Audio Cutter - Cut MP3 Online (Free)',
        seoDescription: 'Trim your songs to the best parts instantly.',
        keywords: ['Audio Cutter', 'MP3 Cutter', 'Trim Audio'],
        content: {
            title: 'How to Cut Audio Online',
            description: 'Precise waveform editing for your sound files.',
            steps: ['Upload audio', 'Select range', 'Cut', 'Download'],
            features: ['Waveform view', 'Fast', 'Secure']
        }
    },
    {
        id: 'audio-compressor',
        title: 'Audio Compressor',
        description: 'Reduce the file size of your songs and recordings.',
        iconName: 'Zap',
        category: 'Video',
        href: '/video/audio-compressor',
        type: 'file-to-file',
        seoTitle: 'Audio Compressor - Reduce MP3 Size (Free)',
        seoDescription: 'Optimize audio bitrates to save storage space.',
        keywords: ['Audio Compressor', 'Reduce MP3 Size', 'Sound Optimizer'],
        content: {
            title: 'How to Compress Audio',
            description: 'Shrink your audio files while keeping them clear.',
            steps: ['Upload audio', 'Select bitrate', 'Compress', 'Download'],
            features: ['Smart bitrate', 'HQ results', 'Fast']
        }
    },
    {
        id: 'wav-to-mp3',
        title: 'WAV to MP3',
        description: 'Convert heavy WAV files to high-quality MP3 format.',
        iconName: 'Zap',
        category: 'Video',
        href: '/video/wav-to-mp3',
        type: 'file-to-file',
        seoTitle: 'WAV to MP3 - Audio Converter Online (Free)',
        seoDescription: 'Standardize your audio assets to the popular MP3 format.',
        keywords: ['WAV to MP3', 'Audio Converter', 'Convert WAV'],
        content: {
            title: 'How to Convert WAV to MP3',
            description: 'High-speed audio transcoding in your browser.',
            steps: ['Upload WAV', 'Convert', 'Download MP3'],
            features: ['ID3 tag support', '320kbps support', 'Fast']
        }
    },
    {
        id: 'mp3-to-wav',
        title: 'MP3 to WAV',
        description: 'Convert MP3 files to uncompressed WAV format.',
        iconName: 'Zap',
        category: 'Video',
        href: '/video/mp3-to-wav',
        type: 'file-to-file',
        seoTitle: 'MP3 to WAV - Audio Converter Online (Free)',
        seoDescription: 'Decompress MP3 audio for professional editing.',
        keywords: ['MP3 to WAV', 'Audio Converter', 'Convert MP3'],
        content: {
            title: 'How to Convert MP3 to WAV',
            description: 'Professional grade audio decompression.',
            steps: ['Upload MP3', 'Convert', 'Download WAV'],
            features: ['Lossless output', 'Fast', 'Free']
        }
    },
    {
        id: 'video-to-mp3',
        title: 'Video to MP3',
        description: 'Convert any video file into a high-quality MP3.',
        iconName: 'Zap',
        category: 'Video',
        href: '/video/video-to-mp3',
        type: 'file-to-file',
        seoTitle: 'Video to MP3 - Fast Audio Extractor (Free)',
        seoDescription: 'Save video soundtracks as MP3 songs instantly.',
        keywords: ['Video to MP3', 'Convert MP4 to MP3', 'Audio Extractor'],
        content: {
            title: 'How to Convert Video to MP3',
            description: 'Turn your favorite videos into an audio library.',
            steps: ['Upload video', 'Convert', 'Download MP3'],
            features: ['High bitrate', 'Fast', 'Secure']
        }
    },
    {
        id: 'webm-to-mp4',
        title: 'WebM to MP4',
        description: 'Convert web-standard WebM videos to MP4.',
        iconName: 'Video',
        category: 'Video',
        href: '/video/webm-to-mp4',
        type: 'file-to-file',
        seoTitle: 'WebM to MP4 - Video Converter Online (Free)',
        seoDescription: 'Make web-optimized videos compatible with all devices.',
        keywords: ['WebM to MP4', 'WebM Converter', 'Fix WebM'],
        content: {
            title: 'How to Convert WebM to MP4',
            description: 'Fast and secure transcoding for web footage.',
            steps: ['Upload WebM', 'Convert', 'Download MP4'],
            features: ['HQ output', 'Fast', 'Free']
        }
    },
    {
        id: 'mp4-to-webm',
        title: 'MP4 to WebM',
        description: 'Convert MP4 videos to WebM for website integration.',
        iconName: 'Video',
        category: 'Video',
        href: '/video/mp4-to-webm',
        type: 'file-to-file',
        seoTitle: 'MP4 to WebM - Web Video Converter (Free)',
        seoDescription: 'Create highly efficient videos for modern web browsers.',
        keywords: ['MP4 to WebM', 'WebM Converter', 'Optimized Video'],
        content: {
            title: 'How to Convert MP4 to WebM',
            description: 'Ensure fast loading on your site with WebM.',
            steps: ['Upload MP4', 'Convert', 'Download WebM'],
            features: ['Small file size', 'Fast', 'Free']
        }
    },
    {
        id: 'tiktok-downloader',
        title: 'TikTok Downloader',
        description: 'Download TikTok videos without watermark in HD.',
        iconName: 'Video',
        category: 'Video',
        href: '/video/tiktok-downloader',
        type: 'url-to-file',
        seoTitle: 'TikTok Downloader - No Watermark Online (Free)',
        seoDescription: 'Save clean TikTok videos in high definition MP4.',
        keywords: ['TikTok Downloader', 'No Watermark', 'Save TikTok'],
        content: {
            title: 'How to Download TikTok without Watermark',
            description: 'Paste the link and get the clean HD video file.',
            steps: ['Copy TikTok link', 'Paste on ToolOmni', 'Fetch', 'Download HD'],
            features: ['No watermark', 'HD quality', 'Fast']
        }
    }
];
