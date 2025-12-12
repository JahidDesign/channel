import ArticlePage from '../../../components/pages/ArticlePage';
export default function Article({ params }) {
  return <ArticlePage id={params.id} />
}
