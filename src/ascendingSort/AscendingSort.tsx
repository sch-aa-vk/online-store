import { useAppDispatch } from '../store.hooks';
import { sortProducts } from '../products/products.slice';
import './AscendingSort.css';

const AscendingSort: React.FC = () => {
    const dispatch = useAppDispatch();
    const handleSortSelect = (option: string) => dispatch(sortProducts(option));

    return (
        <div className='select-sort__wrapper'>
            <select onChange={(e) => handleSortSelect(e.target.value)} className='select-sort'>
                <option value="placeholder">Choose sort</option>
                <option value="big ratings first">Big ratings first</option>
                <option value="low ratings first">Low ratings first</option>
                <option value="big price first">Big price first</option>
                <option value="low price first">Low price first</option>
                <option value="big discount first">Big discount first</option>
                <option value="low discount first">Low discount first</option>
            </select>
        </div>
    )
}

export default AscendingSort;