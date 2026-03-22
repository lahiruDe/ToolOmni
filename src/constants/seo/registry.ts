import { SEOPage } from './types';
import { ADD_TEXT_TO_IMAGE_SEO_PAGES } from './add-text-to-image';
import { ADD_WATERMARK_SEO_PAGES } from './add-watermark';
import { AI_CONTENT_DETECTOR_SEO_PAGES } from './ai-content-detector';
import { AI_PARAPHRASER_SEO_PAGES } from './ai-paraphraser';
import { AI_SLOGAN_GENERATOR_SEO_PAGES } from './ai-slogan-generator';
import { AI_STORY_GENERATOR_SEO_PAGES } from './ai-story-generator';
import { AUDIO_COMPRESSOR_SEO_PAGES } from './audio-compressor';
import { AUDIO_CUTTER_SEO_PAGES } from './audio-cutter';
import { AUDIO_JOINER_SEO_PAGES } from './audio-joiner';
import { BACKGROUND_REMOVER_SEO_PAGES } from './background-remover';
import { IMAGE_UPSCALER_SEO_PAGES } from './image-upscaler';
import { BASE64_ENCODER_SEO_PAGES } from './base64-encoder';
import { BLUR_FACE_SEO_PAGES } from './blur-face';
import { BULK_IMAGE_RESIZER_SEO_PAGES } from './bulk-image-resizer';
import { CASE_CONVERTER_SEO_PAGES } from './case-converter';
import { CHANGE_VIDEO_SPEED_SEO_PAGES } from './change-video-speed';
import { COLORIZE_PHOTO_SEO_PAGES } from './colorize-photo';
import { COMPRESS_IMAGE_SEO_PAGES } from './compress-image';
import { COMPRESS_PDF_SEO_PAGES } from './compress-pdf';
import { COMPRESS_VIDEO_SEO_PAGES } from './compress-video';
import { CONVERT_TO_WEBP_SEO_PAGES } from './convert-to-webp';
import { CROP_IMAGE_SEO_PAGES } from './crop-image';
import { CROP_PDF_SEO_PAGES } from './crop-pdf';
import { CSS_MINIFIER_SEO_PAGES } from './css-minifier';
import { CSV_TO_JSON_SEO_PAGES } from './csv-to-json';
import { DELETE_PAGES_SEO_PAGES } from './delete-pages';
import { EPS_TO_JPG_SEO_PAGES } from './eps-to-jpg';
import { ESSAY_WRITER_SEO_PAGES } from './essay-writer';
import { EXCEL_TO_PDF_SEO_PAGES } from './excel-to-pdf';
import { EXTRACT_AUDIO_SEO_PAGES } from './extract-audio';
import { FLATTEN_PDF_SEO_PAGES } from './flatten-pdf';
import { FLIP_IMAGE_SEO_PAGES } from './flip-image';
import { GIF_MAKER_SEO_PAGES } from './gif-maker';
import { GRAMMAR_CHECKER_SEO_PAGES } from './grammar-checker';
import { GRAYSCALE_PDF_SEO_PAGES } from './grayscale-pdf';
import { HEIC_TO_JPG_SEO_PAGES } from './heic-to-jpg';
import { HTML_MINIFIER_SEO_PAGES } from './html-minifier';
import { ICO_CONVERTER_SEO_PAGES } from './ico-converter';
import { IMAGE_TO_BASE64_SEO_PAGES } from './image-to-base64';
import { IMAGE_TO_JPG_SEO_PAGES } from './image-to-jpg';
import { IMAGE_TO_PNG_SEO_PAGES } from './image-to-png';
import { IMAGE_TO_TEXT_SEO_PAGES } from './image-to-text';
import { JPG_TO_PDF_SEO_PAGES } from './jpg-to-pdf';
import { JSON_TO_CSV_SEO_PAGES } from './json-to-csv';
import { LOREM_IPSUM_GENERATOR_SEO_PAGES } from './lorem-ipsum-generator';
import { MARKDOWN_TO_HTML_SEO_PAGES } from './markdown-to-html';
import { MEME_GENERATOR_SEO_PAGES } from './meme-generator';
import { MERGE_PDF_SEO_PAGES } from './merge-pdf';
import { MKV_TO_MP4_SEO_PAGES } from './mkv-to-mp4';
import { MOV_TO_MP4_SEO_PAGES } from './mov-to-mp4';
import { MP3_TO_WAV_SEO_PAGES } from './mp3-to-wav';
import { MP4_TO_WEBM_SEO_PAGES } from './mp4-to-webm';
import { MUTE_VIDEO_SEO_PAGES } from './mute-video';
import { N_UP_PDF_SEO_PAGES } from './n-up-pdf';
import { NOISE_REDUCER_SEO_PAGES } from './noise-reducer';
import { OBJECT_REMOVER_SEO_PAGES } from './object-remover';
import { ORGANIZE_PAGES_SEO_PAGES } from './organize-pages';
import { PASSWORD_GENERATOR_SEO_PAGES } from './password-generator';
import { PDF_TO_EXCEL_SEO_PAGES } from './pdf-to-excel';
import { PDF_TO_HTML_SEO_PAGES } from './pdf-to-html';
import { PDF_TO_JPG_SEO_PAGES } from './pdf-to-jpg';
import { PDF_TO_TEXT_SEO_PAGES } from './pdf-to-text';
import { PDF_TO_WORD_SEO_PAGES } from './pdf-to-word';
import { PHOTO_ENHANCER_SEO_PAGES } from './photo-enhancer';
import { PHOTO_FILTER_SEO_PAGES } from './photo-filter';
import { PNG_TO_JPG_SEO_PAGES } from './png-to-jpg';
import { PPT_TO_PDF_SEO_PAGES } from './ppt-to-pdf';
import { PROTECT_PDF_SEO_PAGES } from './protect-pdf';
import { QR_GENERATOR_SEO_PAGES } from './qr-generator';
import { REMOVE_LINE_BREAKS_SEO_PAGES } from './remove-line-breaks';
import { REMOVE_WATERMARK_SEO_PAGES } from './remove-watermark';
import { REPAIR_PDF_SEO_PAGES } from './repair-pdf';
import { RESIZE_IMAGE_SEO_PAGES } from './resize-image';
import { RESIZE_VIDEO_SEO_PAGES } from './resize-video';
import { REVERSE_VIDEO_SEO_PAGES } from './reverse-video';
import { ROTATE_IMAGE_SEO_PAGES } from './rotate-image';
import { ROTATE_PDF_SEO_PAGES } from './rotate-pdf';
import { ROUNDED_CORNERS_SEO_PAGES } from './rounded-corners';
import { SENTENCE_EXPANDER_SEO_PAGES } from './sentence-expander';
import { SIGN_PDF_SEO_PAGES } from './sign-pdf';
import { SPLIT_PDF_SEO_PAGES } from './split-pdf';
import { SVG_TO_PNG_SEO_PAGES } from './svg-to-png';
import { TEXT_SUMMARIZER_SEO_PAGES } from './text-summarizer';
import { TEXT_TO_SPEECH_SEO_PAGES } from './text-to-speech';
import { TIKTOK_DOWNLOADER_SEO_PAGES } from './tiktok-downloader';
import { TITLE_GENERATOR_SEO_PAGES } from './title-generator';
import { UNIT_CONVERTER_SEO_PAGES } from './unit-converter';
import { UNLOCK_PDF_SEO_PAGES } from './unlock-pdf';
// UPSCALE_IMAGE_SEO_PAGES removed in favor of IMAGE_UPSCALER_SEO_PAGES
import { URL_ENCODER_SEO_PAGES } from './url-encoder';
import { VIDEO_TO_GIF_SEO_PAGES } from './video-to-gif';
import { VIDEO_TO_MP3_SEO_PAGES } from './video-to-mp3';
import { VIDEO_TO_MP4_SEO_PAGES } from './video-to-mp4';
import { VIDEO_TRIMMER_SEO_PAGES } from './video-trimmer';
import { WATERMARK_IMAGE_SEO_PAGES } from './watermark-image';
import { WAV_TO_MP3_SEO_PAGES } from './wav-to-mp3';
import { WEBM_TO_MP4_SEO_PAGES } from './webm-to-mp4';
import { WEBP_TO_JPG_SEO_PAGES } from './webp-to-jpg';
import { WORD_COUNTER_SEO_PAGES } from './word-counter';
import { WORD_TO_PDF_SEO_PAGES } from './word-to-pdf';
import { XML_FORMATTER_SEO_PAGES } from './xml-formatter';

export const ALL_SEO_PAGES: SEOPage[] = [
    ...ADD_TEXT_TO_IMAGE_SEO_PAGES,
    ...ADD_WATERMARK_SEO_PAGES,
    ...AI_CONTENT_DETECTOR_SEO_PAGES,
    ...AI_PARAPHRASER_SEO_PAGES,
    ...AI_SLOGAN_GENERATOR_SEO_PAGES,
    ...AI_STORY_GENERATOR_SEO_PAGES,
    ...AUDIO_COMPRESSOR_SEO_PAGES,
    ...AUDIO_CUTTER_SEO_PAGES,
    ...AUDIO_JOINER_SEO_PAGES,
    ...BACKGROUND_REMOVER_SEO_PAGES,
    ...BASE64_ENCODER_SEO_PAGES,
    ...BLUR_FACE_SEO_PAGES,
    ...BULK_IMAGE_RESIZER_SEO_PAGES,
    ...CASE_CONVERTER_SEO_PAGES,
    ...CHANGE_VIDEO_SPEED_SEO_PAGES,
    ...COLORIZE_PHOTO_SEO_PAGES,
    ...COMPRESS_IMAGE_SEO_PAGES,
    ...COMPRESS_PDF_SEO_PAGES,
    ...COMPRESS_VIDEO_SEO_PAGES,
    ...CONVERT_TO_WEBP_SEO_PAGES,
    ...CROP_IMAGE_SEO_PAGES,
    ...CROP_PDF_SEO_PAGES,
    ...CSS_MINIFIER_SEO_PAGES,
    ...CSV_TO_JSON_SEO_PAGES,
    ...DELETE_PAGES_SEO_PAGES,
    ...EPS_TO_JPG_SEO_PAGES,
    ...ESSAY_WRITER_SEO_PAGES,
    ...EXCEL_TO_PDF_SEO_PAGES,
    ...EXTRACT_AUDIO_SEO_PAGES,
    ...FLATTEN_PDF_SEO_PAGES,
    ...FLIP_IMAGE_SEO_PAGES,
    ...GIF_MAKER_SEO_PAGES,
    ...GRAMMAR_CHECKER_SEO_PAGES,
    ...GRAYSCALE_PDF_SEO_PAGES,
    ...HEIC_TO_JPG_SEO_PAGES,
    ...HTML_MINIFIER_SEO_PAGES,
    ...ICO_CONVERTER_SEO_PAGES,
    ...IMAGE_TO_BASE64_SEO_PAGES,
    ...IMAGE_TO_JPG_SEO_PAGES,
    ...IMAGE_TO_PNG_SEO_PAGES,
    ...IMAGE_TO_TEXT_SEO_PAGES,
    ...IMAGE_UPSCALER_SEO_PAGES,
    ...JPG_TO_PDF_SEO_PAGES,
    ...JSON_TO_CSV_SEO_PAGES,
    ...LOREM_IPSUM_GENERATOR_SEO_PAGES,
    ...MARKDOWN_TO_HTML_SEO_PAGES,
    ...MEME_GENERATOR_SEO_PAGES,
    ...MERGE_PDF_SEO_PAGES,
    ...MKV_TO_MP4_SEO_PAGES,
    ...MOV_TO_MP4_SEO_PAGES,
    ...MP3_TO_WAV_SEO_PAGES,
    ...MP4_TO_WEBM_SEO_PAGES,
    ...MUTE_VIDEO_SEO_PAGES,
    ...N_UP_PDF_SEO_PAGES,
    ...NOISE_REDUCER_SEO_PAGES,
    ...OBJECT_REMOVER_SEO_PAGES,
    ...ORGANIZE_PAGES_SEO_PAGES,
    ...PASSWORD_GENERATOR_SEO_PAGES,
    ...PDF_TO_EXCEL_SEO_PAGES,
    ...PDF_TO_HTML_SEO_PAGES,
    ...PDF_TO_JPG_SEO_PAGES,
    ...PDF_TO_TEXT_SEO_PAGES,
    ...PDF_TO_WORD_SEO_PAGES,
    ...PHOTO_ENHANCER_SEO_PAGES,
    ...PHOTO_FILTER_SEO_PAGES,
    ...PNG_TO_JPG_SEO_PAGES,
    ...PPT_TO_PDF_SEO_PAGES,
    ...PROTECT_PDF_SEO_PAGES,
    ...QR_GENERATOR_SEO_PAGES,
    ...REMOVE_LINE_BREAKS_SEO_PAGES,
    ...REMOVE_WATERMARK_SEO_PAGES,
    ...REPAIR_PDF_SEO_PAGES,
    ...RESIZE_IMAGE_SEO_PAGES,
    ...RESIZE_VIDEO_SEO_PAGES,
    ...REVERSE_VIDEO_SEO_PAGES,
    ...ROTATE_IMAGE_SEO_PAGES,
    ...ROTATE_PDF_SEO_PAGES,
    ...ROUNDED_CORNERS_SEO_PAGES,
    ...SENTENCE_EXPANDER_SEO_PAGES,
    ...SIGN_PDF_SEO_PAGES,
    ...SPLIT_PDF_SEO_PAGES,
    ...SVG_TO_PNG_SEO_PAGES,
    ...TEXT_SUMMARIZER_SEO_PAGES,
    ...TEXT_TO_SPEECH_SEO_PAGES,
    ...TIKTOK_DOWNLOADER_SEO_PAGES,
    ...TITLE_GENERATOR_SEO_PAGES,
    ...UNIT_CONVERTER_SEO_PAGES,
    ...UNLOCK_PDF_SEO_PAGES,
// removed duplicate

    ...URL_ENCODER_SEO_PAGES,
    ...VIDEO_TO_GIF_SEO_PAGES,
    ...VIDEO_TO_MP3_SEO_PAGES,
    ...VIDEO_TO_MP4_SEO_PAGES,
    ...VIDEO_TRIMMER_SEO_PAGES,
    ...WATERMARK_IMAGE_SEO_PAGES,
    ...WAV_TO_MP3_SEO_PAGES,
    ...WEBM_TO_MP4_SEO_PAGES,
    ...WEBP_TO_JPG_SEO_PAGES,
    ...WORD_COUNTER_SEO_PAGES,
    ...WORD_TO_PDF_SEO_PAGES,
    ...XML_FORMATTER_SEO_PAGES
];

export function getSEOPageBySlug(slug: string): SEOPage | undefined {
    return ALL_SEO_PAGES.find(p => p.slug === slug);
}
