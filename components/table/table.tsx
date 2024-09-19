import * as React from 'react';
import { DataTable } from 'react-native-paper';

const Table = (props: any) => {
  const [page, setPage] = React.useState<number>(0);
  const [numberOfItemsPerPageList] = React.useState([props.itemsPorPagina]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0]
  );

  

  const [items] = React.useState(props.items);
  const keys = Object.keys(items.length > 0 ? items[0] : {});

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <DataTable>
      <DataTable.Header>
        {props.headers.map((header) =><DataTable.Title>{header}</DataTable.Title>)}
          
      </DataTable.Header>

      {items.length > 0 ? items.slice(from, to).map((item) => (
        <DataTable.Row key={item.key}>
          {keys.map((key) => <DataTable.Cell>{item[key]}</DataTable.Cell>)}         
        </DataTable.Row>
      )) : null}

      <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(items.length / itemsPerPage)}
        onPageChange={(page) => setPage(page)}
        label={`${from + 1}-${to} of ${items.length}`}
        numberOfItemsPerPageList={numberOfItemsPerPageList}
        numberOfItemsPerPage={itemsPerPage}
        onItemsPerPageChange={onItemsPerPageChange}
        showFastPaginationControls
        selectPageDropdownLabel={'Rows per page'}
      />
    </DataTable>
  );
};

Table.defaultProps = {
  headers: [],
  items: []
  
}

export default Table;