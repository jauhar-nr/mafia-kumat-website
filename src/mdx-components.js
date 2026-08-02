import { YouTubePlayer } from './components/YouTubePlayer';
import { PDFViewer } from './components/PDFViewer';

export function useMDXComponents(components) {
  return {
    ...components,
    YouTubePlayer,
    PDFViewer,
  };
}
