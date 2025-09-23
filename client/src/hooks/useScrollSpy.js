import { useEffect } from 'react';

export function useScrollSpy(sectionIds, { offset = 200, onActiveChange } = {}) {
  useEffect(() => {
    if (!sectionIds?.length) return;

    function handleScroll() {
      const position = window.scrollY + offset;
      let activeId = sectionIds[0];

      for (const id of sectionIds) {
        const section = document.getElementById(id);
        if (!section) continue;
        if (position >= section.offsetTop && position <= section.offsetTop + section.offsetHeight) {
          activeId = id;
          break;
        }
      }

      onActiveChange?.(activeId);
    }

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('load', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('load', handleScroll);
    };
  }, [sectionIds, offset, onActiveChange]);
}
