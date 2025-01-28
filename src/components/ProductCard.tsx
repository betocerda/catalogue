import { StarIcon } from 'lucide-react'
import { useAppDispatch } from '@/store/hooks'
import { addToCart } from '@/store/features/cartSlice'

// props for the product card component
interface ProductProps {
  id: number
  title: string
  description: string
  price: number
  currency: string
  image: string
  rating: number
}


export default function ProductCard({ id, title, description, price, currency, image, rating }: ProductProps) {
  const dispatch = useAppDispatch()

  const handleAddToCart = () => {
    dispatch(addToCart({ 
      id, 
      title, 
      price, 
      currency,
      quantity: 1 
    }))
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">

      {/* Card Image */}
      <img 
        src={image} 
        alt={title}
        className="w-full h-48 object-cover"
      />
      
      <div className="p-4">

        {/* Card Title */}
        <h3 className="text-lg font-semibold mb-2">{title}</h3>

        {/* Card Description */}
        <p className="text-gray-600 mb-2">
          {/* truncate if longer than 100 chars */}
          {description.length > 100 
            ? `${description.substring(0, 100)}...` // adds ellipses to long descriptions
            : description}
        </p>

        {/* Card Rating */}
        <div className="flex items-center mb-2">
          {/* maps through the array to render stars */}
          {[...Array(5)].map((_, i) => (
            <StarIcon
              key={i}
              className={`w-4 h-4 ${
                i < Math.round(rating) // rounds the rating, no halved stars or fractions of stars
                  ? 'text-yellow-400 fill-current' // yellow if it's within the rating
                  : 'text-gray-300'
              }`}
            />
          ))}
        </div>
        
        <div className="flex justify-between items-center">
          {/* Card Price */}
          <span className="text-lg font-bold">
            ${price.toFixed(2)}
          </span>
          {/* Card add to cart */}
          <button
            onClick={handleAddToCart}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}