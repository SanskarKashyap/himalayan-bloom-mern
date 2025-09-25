import CollectionSection from '../components/sections/Collection/CollectionSection.jsx';
import PreorderSection from '../components/sections/Preorder/PreorderSection.jsx';

export default function ShopPage() {
  return (
    <div className="flex flex-col gap-24 sm:gap-28">
      <CollectionSection />
      <PreorderSection />
    </div>
  );
}
