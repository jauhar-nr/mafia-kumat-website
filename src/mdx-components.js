import { YouTubePlayer } from './components/YouTubePlayer';
import { PDFViewer } from './components/PDFViewer';
import { GDrivePDF } from './components/GDrivePDF';

export function useMDXComponents(components) {
  return {
    ...components,
    YouTubePlayer,
    PDFViewer,
    GDrivePDF,
  };
}
