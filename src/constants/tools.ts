import { 
  FilePlus, 
  FileText, 
  Zap, 
  ImageIcon, 
  ShieldCheck, 
  RotateCcw, 
  X, 
  Globe,
  Sparkles,
  Video,
  Languages,
  PenTool,
  QrCode
} from 'lucide-react';
import { PDF_TOOLS } from './tools/pdf';
import { IMAGE_TOOLS } from './tools/image';
import { VIDEO_TOOLS } from './tools/video';
import { WRITING_TOOLS } from './tools/writing';
import { UTILITY_TOOLS } from './tools/utility';

export const ICON_MAP: Record<string, any> = {
    FilePlus,
    FileText,
    Zap,
    ImageIcon,
    ShieldCheck,
    RotateCcw,
    X,
    Globe,
    Sparkles,
    Video,
    Languages,
    PenTool,
    QrCode
};

export type ToolCategory = 'PDF' | 'Image' | 'Video' | 'AI' | 'Writing' | 'Utility';
export type ToolType = 'file-to-file' | 'url-to-file' | 'text-to-text';

export interface Tool {
  id: string;
  title: string;
  description: string;
  iconName: string;
  category: ToolCategory;
  href: string;
  type: ToolType;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  content: {
    title: string;
    description: string;
    steps: string[];
    features: string[];
  };
  faqs?: {
    question: string;
    answer: string;
  }[];
}

export const CATEGORIES = ['PDF', 'Image', 'Video', 'AI', 'Writing', 'Utility'];

export const CATEGORY_DETAILS = [
    { name: 'PDF', iconName: 'FileText', description: 'Merge, split, compress, and convert PDF files.' },
    { name: 'Image', iconName: 'ImageIcon', description: 'AI background remover, resizer, and editors.' },
    { name: 'Video', iconName: 'Video', description: 'Trim, mute, and convert video and audio.' },
    { name: 'Writing', iconName: 'PenTool', description: 'AI grammar checker, summarizer, and writer.' },
    { name: 'Utility', iconName: 'Zap', description: 'QR generator, password generator, and more.' }
];

export const TOOLS: Tool[] = [
  ...PDF_TOOLS,
  ...IMAGE_TOOLS,
  ...VIDEO_TOOLS,
  ...WRITING_TOOLS,
  ...UTILITY_TOOLS
];
