import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    name: string;
    price: number;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://62966f97810c00c1cb75cbe3.mockapi.io/items/` + id,
        );
        setPizza(data);
        console.log(data);
      } catch (error) {
        console.log(error);
        alert('Ошибка');
        navigate('/');
      }
    }

    fetchPizza();
  }, []);

  if (!pizza) {
    return <>'Загрузка...'</>;
  }

  return (
    <div>
      <h2>{pizza.name}</h2>
      <img src={pizza.imageUrl} alt="pizza" />
      <p>{pizza.price} ₴</p>
      <Link to='/'>
        <button type='button'>Назад</button>
      </Link>
     
    </div>
  );
};

export default FullPizza;
