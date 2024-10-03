export { };

interface News {
  id: number;
  title: string;
  image: string;
  content: string;
  publisher: string;
  publisherIcon: string;
  publishDate: string;
  category: number;
}
interface Category {
  id: number;
  name: string;
}

declare global {
  interface Window {
    pageLanguage: string;
    editNews: News;
    loggedInAsAdmin: boolean;
  }
}

window.loggedInAsAdmin = true;
window.pageLanguage = "EN";