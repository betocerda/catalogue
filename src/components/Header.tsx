import { useAppSelector } from '@/store/hooks'

export default function Header() {

  // extract from the cart slice in the store
  const { totalItems, totalPrice } = useAppSelector(state => state.cart)

  return (
    // header with a fixed position, so that when scrolling total price can still be seen
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <span>Items: {totalItems}</span>
          <span>Total: ${totalPrice.toFixed(2)}</span>
        </div>
      </div>
    </header>
  )
}