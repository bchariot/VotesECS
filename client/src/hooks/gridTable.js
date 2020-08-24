import React from 'react';
import { AgGridReact } from 'ag-grid-react';

const GridTable = ({dataItems, title, columnDefs}, ref) => {
    return (
        <div>
            <details>
                <summary>
                    <span className="summary-title">{title} - Details</span>
                    <div className="summary-chevron-up">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className ="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </div>
                </summary>
                <div className="ag-theme-alpine" style={{ height: '400px', width: '100%' }}>
                    <AgGridReact className="ag-theme-alpine grid" columnDefs={columnDefs} rowData={dataItems}></AgGridReact>
                </div>
            </details>
        </div>
    );
}

const forwardedGridTable = React.forwardRef(GridTable);

export default forwardedGridTable;
