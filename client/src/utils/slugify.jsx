
export const slugify = (text) => {
  const map = {
    ą: 'a',
    ć: 'c',
    ę: 'e',
    ł: 'l',
    ń: 'n',
    ó: 'o',
    ś: 's',
    ź: 'z',
    ż: 'z',
  };

  return text
    .toLowerCase()
    .replace(/[ąćęłńóśźż]/g, (match) => map[match])
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
};