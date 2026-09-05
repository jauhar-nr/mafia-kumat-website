import { getChapters } from '../../../lib/chapters';
import { ChapterLayoutClient } from '../../../components/ChapterLayoutClient';

export default function MateriLayout({ children }) {
  const chapters = getChapters();

  return (
    <ChapterLayoutClient chapters={chapters}>
      {children}
    </ChapterLayoutClient>
  );
}
