import {useState} from 'react';
import Link from 'next/link';
import {KeyboardArrowUpRounded, KeyboardArrowDownRounded} from '@material-ui/icons';
import styles from './CountriesTable.module.css';

const orderBy = (countries, value, direction) => {
  if (direction === 'asc') {
    return [...countries].sort((a, b) => (a[value] > b[value] ? 1 : -1));
  }
  if (direction === 'desc') {
    return [...countries].sort((a, b) => (a[value] > b[value] ? -1 : 1));
  }

  return countries;
};

const SortArrow = ({direction}) => {
  if (!direction) {
    return null;
  }

  if (direction === 'desc') {
    return (
      <div className={styles.heading_arrow}>
        <KeyboardArrowDownRounded color='inherit' />
      </div>
    );
  } else {
    return (
      <div className={styles.heading_arrow}>
        <KeyboardArrowUpRounded color='inherit' />
      </div>
    );
  }
};

const CountriesTable = ({countries}) => {
  const [direction, setDirection] = useState();
  const [value, setValue] = useState();

  const orderedCountries = orderBy(countries, value, direction) || [];

  const switchDirection = () => {
    if (!direction) {
      setDirection('desc');
    } else if (direction === 'desc') {
      setDirection('asc');
    } else {
      setDirection(null);
    }
  };

  const setValueAndDirection = (value) => {
    switchDirection();
    setValue(value);
  };

  return (
    <div>
      <div className={styles.heading}>
        <div className={styles.heading_flag}></div>
        <button className={styles.heading_name} onClick={() => setValueAndDirection('name')}>
          <div>Name</div>
          {value === 'name' && <SortArrow direction={direction} />}
        </button>
        {/* ...................... */}
        <button
          className={styles.heading_population}
          onClick={() => setValueAndDirection('population')}
        >
          <div>Population</div>
          {value === 'population' && <SortArrow direction={direction} />}
        </button>
        {/* ...................... */}
        <button className={styles.heading_area} onClick={() => setValueAndDirection('area')}>
          <div>
            Area(km<sup style={{fontSize: '0.rem'}}>2</sup>)
          </div>
          {value === 'area' && <SortArrow direction={direction} />}
        </button>

        {/* ...............................  */}

        <button className={styles.heading_gini} onClick={() => setValueAndDirection('gini')}>
          <div>Gini</div>
          {value === 'gini' && <SortArrow direction={direction} />}
        </button>
      </div>
      {orderedCountries.map((country) => (
        <Link href={`/country/${country.alpha3Code}`} key={country.name}>
          <div className={styles.table_row}>
            <div className={styles.col_flag}>
              <img src={country.flag} alt={country.name} />
            </div>
            <div className={styles.col_name}>{country.name}</div>
            <div className={styles.col_population}>{country.population}</div>
            <div className={styles.col_area}>{country.area || 0}</div>
            <div className={styles.col_gini}>{country.gini || 0}%</div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CountriesTable;
