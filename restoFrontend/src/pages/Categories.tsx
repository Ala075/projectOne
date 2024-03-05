import { IMAGE_URL } from "@/api/Config";
import { useRes } from "@/context/ResCtx"

const Categories = () => {
  const { categories } = useRes();

  return (
    <div className="dashboard__categories">
      {categories.map((category: any) => (
        <div className="dashboard__category" key={category._id}>
          <div className="img">
            <img src={IMAGE_URL+category.image} alt={category.name} />
          </div>
          <div className="dashboard__category__details">
            <h2>{category.name}</h2>
          </div>

          <div className="dashboard__category__actions">
            <button>Edit</button>
            <button>Delete</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Categories