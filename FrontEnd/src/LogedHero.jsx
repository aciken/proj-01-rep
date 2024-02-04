import { AiChat } from "./AiChat"
import PropTypes from 'prop-types';

export function LogedHero({id, tier, usageLocal, setUsageLocal, uses, usageLimit, setUsageLimit, usage}){

    LogedHero.propTypes = {
        id: PropTypes.string.isRequired,
        tier: PropTypes.string.isRequired,
        usageLocal: PropTypes.number.isRequired,
        setUsageLocal: PropTypes.func.isRequired,
        uses: PropTypes.number.isRequired,
        usageLimit: PropTypes.number.isRequired,
        setUsageLimit: PropTypes.func.isRequired,
        history: PropTypes.object.isRequired,
    };
    
    console.log(`ID is ${id} || Tier is ${tier} || Usage is ${usage} || UsageLocal is ${usageLocal}`)

    return(
        <AiChat id={id} tier={tier} usageLocal={usageLocal} setUsageLocal={setUsageLocal} uses={uses} usageLimit={usageLimit} setUsageLimit={setUsageLimit}/>
    )
}

