import { useAppDispatch } from '@/store/hooks'
// import reducers for searching and sorting from product slice
import { setSearchTerm, setSortBy } from '@/store/features/productSlice'

export default function SearchSort() {
  const dispatch = useAppDispatch()

  return (
    <div className="mb-6 flex gap-4">
      <input
        type="text"
        placeholder="Search products..."
        className="flex-1 px-4 py-2 border-none outline-none rounded"
        // dispatches searching action whenever input changes
        onChange={(e) => dispatch(setSearchTerm(e.target.value))}
      />
      <select
        className="px-4 py-2 border-none outline-none rounded"
        // dispatches sorting action whenever selected value on dropdown changes
        onChange={(e) => dispatch(setSortBy(e.target.value as 'price' | 'rating' | null))}
      >
        <option value="">Sort by...</option>
        <option value="price">Price</option>
        <option value="rating">Rating</option>
      </select>
    </div>
  )
}