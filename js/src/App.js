import { useEffect, useState } from 'react';
import jsonData from './customers.json'
import './App.css';

const App = () => {
  const pageParams = new URLSearchParams(window.location.search)
  let value = parseInt(pageParams.get('page'), 10);
  const [perPage, setPerPage] = useState(20);
  const [page, setPage] = useState(value || 1);
  const [totalPages, setTotalPages] = useState(jsonData.length/perPage);
  const [customers, setCustomers] = useState(null)
  const [searchStats, setSearchStats] = useState(null)

  const getCustomers = () => {
    let upperCount = perPage * page;
    let lowerCount = upperCount - perPage;
    setCustomers(jsonData.slice(lowerCount, upperCount))
  }
  const search = (e) => {
    let value = e.target.value;
    let filtered = jsonData.filter(cus => cus.first_name.toLowerCase().includes(value.toLowerCase()) || cus.last_name.toLowerCase().includes(value.toLowerCase()) || cus.email.toLowerCase().includes(value.toLowerCase()) )
    console.log(filtered)
    setSearchStats(value === '' ? filtered.length: null);
    setCustomers(filtered)
  }

  useEffect(() => {
    getCustomers();
  }, [])
  return (
    <div className="App">
      <div className="pagination">
        <div className="search">
          <input onChange={e => search(e)} placeholder="Search by name or email" type="text" name="search" id="search" />
        </div>
        <div className="pages">
          <a href={`?page=${1}`}>{`|<`}</a>
          {page - 1 > 0 && <a href={`?page=${page - 1}`}>{page - 1}</a>}
          <a disabled className="current" href={`?page=${page}`}>{page}</a>
          {page + 1 < totalPages && <a href={`?page=${page + 1}`}>{page + 1}</a>}
          <a href={`?page=${totalPages}`}>{`>|`}</a>
        </div>
        {searchStats && `${searchStats} results found`}
      </div>
      <div className="customers">
        {customers && customers.map(cus => {
          return (
            <div className="customer" key={cus.id}>
              <small className="cus_id">#{cus.id}</small>
              <h4>{`${cus.first_name} ${cus.last_name}`}</h4>
              <p>{cus.email}</p>
              <p>Location: <a href={`http://www.openstreetmap.org/?mlat=${cus.latitude}&mlon=${cus.longitude}&zoom=12`}>{cus.longitude}, {cus.latitude}</a></p>
            </div>
          )
        })}
      </div>
      <div className="pagination">
        <div className="pages">
          <a href={`?page=${1}`}>{`|<`}</a>
          {page - 1 > 0 && <a href={`?page=${page - 1}`}>{page - 1}</a>}
          <a disabled className="current" href={`?page=${page}`}>{page}</a>
          {page + 1 < totalPages && <a href={`?page=${page + 1}`}>{page + 1}</a>}
          <a href={`?page=${totalPages}`}>{`>|`}</a>
        </div>
      </div>
    </div>
  );
}

export default App;
