import React, { useState, useEffect, useRef } from 'react';
import TopTable from './topTable';
import GridTable from './gridTable';

const Votes = () => {
    const showWorstRef = useRef(null), showBestRef = useRef(null);
    const [isWorst, setIsWorst] = useState(false), [isBest, setIsBest] = useState(false);
    const [votes1, setVotes1] = useState([]), [votes2, setVotes2] = useState([]), [votes3, setVotes3] = useState([]), [votes4, setVotes4] = useState([]);

    let columnDefs1 = [
        {headerName: 'Member Id', field: 'NameId', width: 150, sortable: true, unSortIcon: true, filter: true, floatingFilter: true, resizable: true},
        {headerName: 'Name', field: 'Name', width: 300, sortable: true, unSortIcon: true, filter: true, floatingFilter: true, resizable: true},
        {headerName: 'Party', field: 'Party', width: 120, sortable: true, unSortIcon: true, filter: true, floatingFilter: true, resizable: true, cellClassRules: {'rag-blue': 'x == "D"', 'rag-yellow': 'x != "R" && x != "D"', 'rag-red': 'x == "R"'}},
        {headerName: 'State Name', field: 'StateName', width: 200, sortable: true, unSortIcon: true, filter: true, floatingFilter: true, resizable: true},
        {headerName: 'District', field: 'DistrictClass', width: 120, sortable: true, unSortIcon: true, filter: true, floatingFilter: true, resizable: true},
        {headerName: 'Count', field: 'vCount', width: 120, sortable: true, unSortIcon: true, filter: 'agNumberColumnFilter', floatingFilter: true, resizable: true},
        {headerName: 'Link', field: 'Href', width: 100, sortable: false, filter: false, floatingFilter: false, resizable: true, cellRenderer: (href) => `<a href="${href.value}" target="_blank" >Link</a>`}
    ];
    let columnDefs2 = [
        {headerName: 'Member Id', field: 'NameId', width: 150, sortable: true, unSortIcon: true, filter: true, floatingFilter: true, resizable: true},
        {headerName: 'Name', field: 'Name', width: 300, sortable: true, unSortIcon: true, filter: true, floatingFilter: true, resizable: true},
        {headerName: 'Class', field: 'DistrictClass', width: 120, sortable: true, unSortIcon: true, filter: true, floatingFilter: true, resizable: true},
        {headerName: 'Party', field: 'Party', width: 120, sortable: true, unSortIcon: true, filter: true, floatingFilter: true, resizable: true, cellClassRules: {'rag-blue': 'x == "D"', 'rag-yellow': 'x != "R" && x != "D"', 'rag-red': 'x == "R"'}},
        {headerName: 'State Name', field: 'StateName', width: 200, sortable: true, unSortIcon: true, filter: true, floatingFilter: true, resizable: true},
        {headerName: 'Count', field: 'vCount', width: 120, sortable: true, unSortIcon: true, filter: 'agNumberColumnFilter', floatingFilter: true, resizable: true},
        {headerName: 'Link', field: 'Href', width: 100, sortable: false, filter: false, floatingFilter: false, resizable: true, cellRenderer: (href) => `<a href="${href.value}" target="_blank" >Link</a>`}
    ];

    const showWorst = () => { setIsWorst(!isWorst); showBestRef.current.focus(); }
    const showBest = () => { setIsBest(!isBest); showWorstRef.current.focus(); }

    useEffect(() => {
        const fetchData = () => {
            fetch('/api/worst/congress').then(res => res.json()).then(data => setVotes1(data)).then(console.log('absent congress fetched'));
            fetch('/api/worst/senate').then(res => res.json()).then(data => setVotes2(data)).then(console.log('absent senate fetched'));
            fetch('/api/best/congress').then(res => res.json()).then(data => setVotes3(data)).then(console.log('brave congress fetched'));
            fetch('/api/best/senate').then(res => res.json()).then(data => setVotes4(data)).then(console.log('brave senate fetched'));
        }
        fetchData();
        showWorstRef.current.focus();
    }, []);

    return (
        <div id="votes">
            <span className="PageMenu"><button ref={showWorstRef} onClick={showWorst}>Show The Most Absent</button> | <button ref={showBestRef} onClick={showBest}>Show The Bravest</button></span>
            <div className="spacer"></div>

            { !isWorst && !isBest && <div className="Home"><span>Press Buttons above for voting content</span></div> }

            { isWorst && <TopTable dataItems={votes1} title="Most Absent Representatives" count={5} /> }
            { isWorst && <GridTable dataItems={votes1} title="Votes Missed By Representatives" columnDefs={columnDefs1} /> }
            { isWorst && <TopTable dataItems={votes2} title="Most Absent Senators" count={5} /> }
            { isWorst && <GridTable dataItems={votes2} title="Votes Missed By Senators" columnDefs={columnDefs2} /> }

            { isBest && <TopTable dataItems={votes3} title="Bravest Representatives" count={5} /> }
            { isBest && <GridTable dataItems={votes3} title="Bravest Representatives" columnDefs={columnDefs1} /> }
            { isBest && <TopTable dataItems={votes4} title="Bravest Senators" count={5} /> }
            { isBest && <GridTable dataItems={votes4} title="Bravest Senators" columnDefs={columnDefs2} /> }
        </div>
    );
}

export default Votes;