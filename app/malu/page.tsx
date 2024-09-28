// app/malu/page.tsx
import BirthdayPage from './BirthdayPage';
import { getMediaFiles } from '../../lib/getMediaFiles';

export default async function MaluPage() {
  const mediaFiles = await getMediaFiles();
  return <BirthdayPage mediaFiles={mediaFiles} />;
}
