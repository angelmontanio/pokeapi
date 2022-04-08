
function ProgressBar({ hp, attack, defense, speed }){

    const progressbarLogic =( stat ) => {
        const statBase = 150
        return Math.round(( stat * 100 )/ statBase)
    }

    const HP = progressbarLogic( hp )
    const ATTACK = progressbarLogic( attack )
    const DEFENSE = progressbarLogic( defense )
    const SPEED = progressbarLogic( speed )

    console.log( HP, ATTACK, DEFENSE, SPEED )
    return(
        <section className="column column--rigth" >
            <article className="card">
                <h2>Stats</h2>
                <div className="stats">
                    <div className="stats-item">
                        <p className="stats-name">HP</p>
                        <div className="stats-bar stats-bar-hp">
                            <div 
                                style={ { width: `${HP}%` }}
                                className="linear">    
                            </div>
                        </div>
                    </div>
                </div>
                <div className="stats">
                    <div className="stats-item">
                        <p className="stats-name">Attack</p>
                        <div className="stats-bar stats-bar-hp">
                            <div 
                                style={ { width: `${ATTACK}%` }}
                                className="linear">    
                            </div>
                        </div>
                    </div>
                </div>
                <div className="stats">
                    <div className="stats-item">
                        <p className="stats-name">Defense</p>
                        <div className="stats-bar stats-bar-hp">
                            <div 
                                style={ { width: `${DEFENSE}%` }}
                                className="linear">    
                            </div>
                        </div>
                    </div>
                </div>
                <div className="stats">
                    <div className="stats-item">
                        <p className="stats-name">Speed</p>
                        <div className="stats-bar stats-bar-hp">
                            <div 
                                style={ { width: `${SPEED}%` }}
                                className="linear">    
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </section>
    )
}

export default ProgressBar;