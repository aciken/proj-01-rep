import { AiChat } from "./AiChat"

export function LogedHero({id, tier, usageLocal, setUsageLocal, uses, usageLimit, setUsageLimit, usage}){

    console.log(`ID is ${id} || Tier is ${tier} || Usage is ${usage} || UsageLocal is ${usageLocal}`)

    return(
        <AiChat id={id} tier={tier} usageLocal={usageLocal} setUsageLocal={setUsageLocal} uses={uses} usageLimit={usageLimit} setUsageLimit={setUsageLimit}/>
    )
}

