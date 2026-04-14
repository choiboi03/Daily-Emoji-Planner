import { toPng } from 'html-to-image'

export async function exportAsImage(element: HTMLElement, filename: string): Promise<void> {
  const dataUrl = await toPng(element, {
    quality: 1.0,
    pixelRatio: 2,
    backgroundColor: '#ffffff',
  });

  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  link.click();
}
