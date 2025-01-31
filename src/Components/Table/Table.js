import React, { useState } from 'react';
import { Table, Pagination } from 'react-bootstrap';

const ResponsiveTableWithPagination = () => {
  const itemsPerPage = 5;

  // Sample data with 10 columns
  const data = [
    { id: 1, name: 'John Doe', age: 28, address: '123 Main St', phone: '555-1234', email: 'john@example.com', city: 'New York', country: 'USA', profession: 'Developer', company: 'TechCorp' },
    { id: 2, name: 'Jane Smith', age: 32, address: '456 Oak St', phone: '555-5678', email: 'jane@example.com', city: 'Los Angeles', country: 'USA', profession: 'Designer', company: 'DesignCo' },
    { id: 3, name: 'Sam Brown', age: 22, address: '789 Pine St', phone: '555-8765', email: 'sam@example.com', city: 'Chicago', country: 'USA', profession: 'Manager', company: 'BizCorp' },
    { id: 4, name: 'Lucy Green', age: 30, address: '321 Birch St', phone: '555-1122', email: 'lucy@example.com', city: 'San Francisco', country: 'USA', profession: 'HR Specialist', company: 'PeopleCorp' },
    { id: 5, name: 'Mike White', age: 35, address: '654 Maple St', phone: '555-3344', email: 'mike@example.com', city: 'Miami', country: 'USA', profession: 'Sales', company: 'SalesInc' },
    { id: 6, name: 'Emma Black', age: 29, address: '987 Cedar St', phone: '555-5566', email: 'emma@example.com', city: 'Dallas', country: 'USA', profession: 'Developer', company: 'DevTeam' },
    { id: 7, name: 'Paul Blue', age: 40, address: '321 Elm St', phone: '555-7788', email: 'paul@example.com', city: 'Boston', country: 'USA', profession: 'Engineer', company: 'BuildTech' },
    { id: 8, name: 'Anna Red', age: 23, address: '456 Willow St', phone: '555-9900', email: 'anna@example.com', city: 'Seattle', country: 'USA', profession: 'Marketing', company: 'AdWorld' },
    { id: 9, name: 'David Grey', age: 25, address: '159 Oak St', phone: '555-1122', email: 'david@example.com', city: 'Denver', country: 'USA', profession: 'Writer', company: 'WriteNow' },
    { id: 10, name: 'Nina Yellow', age: 27, address: '357 Pine St', phone: '555-2233', email: 'nina@example.com', city: 'Portland', country: 'USA', profession: 'Designer', company: 'DesignStudio' },
  ];

  // State for current page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the data to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Total number of pages
  const pageCount = Math.ceil(data.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mt-4 bg-light rounded-2 ">
      <h2>Responsive Table with 10 Columns and Pagination</h2>

      {/* Responsive Table */}
      <Table   hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Email</th>
            <th>City</th>
            <th>Country</th>
            <th>Profession</th>
            <th>Company</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.age}</td>
              <td>{item.address}</td>
              <td>{item.phone}</td>
              <td>{item.email}</td>
              <td>{item.city}</td>
              <td>{item.country}</td>
              <td>{item.profession}</td>
              <td>{item.company}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination */}
      <Pagination>
  <Pagination.Prev
    onClick={() => handlePageChange(currentPage - 1)}
    disabled={currentPage === 1}
  />
  
  {/* Show the first two pages */}
  {[...Array(2)].map((_, index) => (
    <Pagination.Item
      key={index}
      active={index + 1 === currentPage}
      onClick={() => handlePageChange(index + 1)}
    >
      {index + 1}
    </Pagination.Item>
  ))}
  
  {/* Add an ellipsis if there are pages in the middle */}
  {pageCount > 4 && currentPage > 3 && currentPage < pageCount - 2 && (
    <Pagination.Item disabled>...</Pagination.Item>
  )}

  {/* Show the current page and adjust for visible range */}
  {currentPage > 2 && currentPage < pageCount - 1 && (
    <Pagination.Item
      key={currentPage}
      active
      onClick={() => handlePageChange(currentPage)}
    >
      {currentPage}
    </Pagination.Item>
  )}

  {/* Add ellipsis after first pages if applicable */}
  {currentPage > 3 && (
    <Pagination.Item disabled>...</Pagination.Item>
  )}

  {/* Show last two pages */}
  {[...Array(2)].map((_, index) => (
    <Pagination.Item
      key={pageCount - 2 + index}
      active={pageCount - 2 + index === currentPage}
      onClick={() => handlePageChange(pageCount - 2 + index)}
    >
      {pageCount - 2 + index}
    </Pagination.Item>
  ))}

  <Pagination.Next
    onClick={() => handlePageChange(currentPage + 1)}
    disabled={currentPage === pageCount}
  />
</Pagination>

    </div>
  );
};

export default ResponsiveTableWithPagination;
