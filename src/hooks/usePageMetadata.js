import { useEffect } from 'react';

const defaultTitle = 'RedOffset | Adversary Simulation Specialists';
const defaultDescription =
  'RedOffset delivers operator-grade red team engagements across digital, physical, and human threat surfaces.';

const usePageMetadata = ({ title, description }) => {
  useEffect(() => {
    if (title) {
      document.title = `${title} | RedOffset`;
    } else {
      document.title = defaultTitle;
    }

    const metaDescription = document.querySelector('meta[name="description"]');
    if (description) {
      if (metaDescription) {
        metaDescription.setAttribute('content', description);
      } else {
        const meta = document.createElement('meta');
        meta.name = 'description';
        meta.content = description;
        document.head.appendChild(meta);
      }
    } else if (metaDescription) {
      metaDescription.setAttribute('content', defaultDescription);
    }
  }, [title, description]);
};

export default usePageMetadata;
