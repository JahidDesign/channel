import CategoryPage from '../../../components/pages/CategoryPage';
export default function Category({ params }) {
  return <CategoryPage slug={params.slug} />
}
