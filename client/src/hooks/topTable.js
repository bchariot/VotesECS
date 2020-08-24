import React from 'react';

const TopTable = ({dataItems, title, count}, ref) => {
    return (
        <div className="worstTable">
            <span className="bold">Top {count} {title}</span>
            <table>
                <tbody>
                    <tr>
                        {dataItems.map(member =>
                        <td className="worstTdClass" key={member.NameId}>
                            <table>
                                <tbody>
                                    <tr>
                                        <td className="tdCenter">
                                            <a href={member.Href} target="_blank" rel="noopener noreferrer">
                                                <img src={"https://bioguideretro.congress.gov/Static_Files/data/photo/" + member.Jpeg} className={"Image" + member.Party} width="150" height="210" alt="" onError={(e)=>{e.target.onerror = null; e.target.src="./ImageNotFound.png"}} /><br />
                                                <span className="worstName">{member.Name}</span><br />
                                                <span className="worstAbbr">{member.Abbr}</span>
                                            </a><br />
                                            <span className="worstVotes">Missed votes: <span className="bold">{member.vCount} ({member.percentMissed}%)</span></span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>).slice(0, parseInt(count))}
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

const forwardedTopTable = React.forwardRef(TopTable);

export default forwardedTopTable;
