import styled from "@emotion/styled";
import { ILead } from "../types/lead.type";
import { Stack, Typography } from "@mui/material";

const MainContainer = styled.div`

`
const RemarksContainer = styled.div`

`
const LeadsDetailContainer = styled.div`

`
function LeadDetailPage({ lead }: { lead: ILead }) {

    const showLeadOwners=()=>{
        let leadOwners:string[]=[]
        if (lead.lead_owners.length)
        {
            lead.lead_owners.map((owner)=>{
                leadOwners.push(owner.username)
                return null
            })
            
        }
        return leadOwners.toString()
    }
    return (
        <MainContainer>
            <Stack direction={"column"}>
                <LeadsDetailContainer>
                    <Typography sx={{border:1, padding: 1,margin:1, fontWeight: 'bold', backgroundColor: 'whitesmoke', textTransform: 'capitalize' }}>
                        Lead Name : {lead.name}
                    </Typography>
                    <Typography sx={{border:1, padding: 1,margin:1, fontWeight: 'bold', backgroundColor: 'whitesmoke', textTransform: 'capitalize' }}>
                         Stage : {lead.stage}
                    </Typography>
                    <Typography sx={{border:1, padding: 1,margin:1, fontWeight: 'bold', backgroundColor: 'whitesmoke', textTransform: 'capitalize' }}>
                        Work Description : {lead.work_description}
                    </Typography>
                    <Typography sx={{border:1, padding: 1,margin:1, fontWeight: 'bold', backgroundColor: 'whitesmoke', textTransform: 'capitalize' }}>
                        TurnOver : {lead.turnover}
                    </Typography>

                    <Typography sx={{border:1, padding: 1,margin:1, fontWeight: 'bold', backgroundColor: 'whitesmoke', textTransform: 'capitalize' }}>
                        Lead Type : {lead.lead_type}
                    </Typography>
                    <Typography sx={{border:1, padding: 1,margin:1, fontWeight: 'bold', backgroundColor: 'whitesmoke', textTransform: 'capitalize' }}>
                        Customer Name : {lead.customer_name}
                    </Typography>
                    <Typography sx={{border:1, padding: 1, borderRadius: 1, margin: 1, fontWeight: 'bold', backgroundColor: 'whitesmoke', textTransform: 'capitalize' }}>
                        Customer Designation : {lead.customer_designation}
                    </Typography>
                    {/* divider */}
                    <Typography sx={{border:1, padding: 1,margin:1, fontWeight: 'bold', backgroundColor: 'whitesmoke', textTransform: 'capitalize' }}>
                        Mobile : {lead.mobile}
                    </Typography>
                    <Typography sx={{border:1, padding: 1,margin:1, fontWeight: 'bold', backgroundColor: 'whitesmoke', textTransform: 'capitalize' }}>
                        Mobile2 : {lead.alternate_mobile1}
                    </Typography>
                    {/* divider */}
                    <Typography sx={{border:1, padding: 1,margin:1, fontWeight: 'bold', backgroundColor: 'whitesmoke', textTransform: 'capitalize' }}>
                        Mobile3 : {lead.alternate_mobile2}
                    </Typography>
                    <Typography sx={{border:1, padding: 1,margin:1, fontWeight: 'bold', backgroundColor: 'whitesmoke', textTransform: 'capitalize' }}>
                        Lead Source : {lead.lead_source}
                    </Typography>
                    {/* divider */}
                    <Typography sx={{border:1, padding: 1,margin:1, fontWeight: 'bold', backgroundColor: 'whitesmoke', textTransform: 'capitalize' }}>
                        Lead Owners : {showLeadOwners()}
                    </Typography>
                    <Typography sx={{border:1, padding: 1,margin:1, fontWeight: 'bold', backgroundColor: 'whitesmoke', textTransform: 'capitalize' }}>
                        Created On : {new Date(lead.created_at).toLocaleString()}
                    </Typography>
                    <Typography sx={{border:1, padding: 1, borderRadius: 1, margin: 1, fontWeight: 'bold', backgroundColor: 'whitesmoke', textTransform: 'capitalize' }}>
                        Created By : {lead.created_by.username}
                    </Typography>
                    {/* divider */}
                    <Typography sx={{border:1, padding: 1,margin:1, fontWeight: 'bold', backgroundColor: 'whitesmoke', textTransform: 'capitalize' }}>
                        Last Updated : {new Date(lead.updated_at).toLocaleString()}
                    </Typography>
                    <Typography sx={{border:1, padding: 1, borderRadius: 1, margin: 1, fontWeight: 'bold', backgroundColor: 'whitesmoke', textTransform: 'capitalize' }}>
                        Last Updated By : {lead.updated_by.username}
                    </Typography>
                    <Typography sx={{border:1, padding: 1,margin:1, fontWeight: 'bold', backgroundColor: 'whitesmoke', textTransform: 'capitalize' }}>
                        Address : {lead.address}
                    </Typography>
                    <Typography sx={{border:1, padding: 1,margin:1, fontWeight: 'bold', backgroundColor: 'whitesmoke', textTransform: 'capitalize' }}>
                        Station : {lead.city}
                    </Typography>  <Typography sx={{border:1, padding: 1,margin:1, fontWeight: 'bold', backgroundColor: 'whitesmoke', textTransform: 'capitalize' }}>
                        State : {lead.state}
                    </Typography>
                    <Typography sx={{border:1, padding: 1,margin:1, fontWeight: 'bold', backgroundColor: 'whitesmoke', textTransform: 'capitalize' }}>
                        Email1 : {lead.email}
                    </Typography>
                    <Typography sx={{border:1, padding: 1,margin:1, fontWeight: 'bold', backgroundColor: 'whitesmoke', textTransform: 'capitalize' }}>
                        Email2 : {lead.alternate_email}
                    </Typography>
                    <Typography sx={{border:1, padding: 1, borderRadius: 1, margin: 1, fontWeight: 'bold', backgroundColor: 'whitesmoke', textTransform: 'capitalize' }}>
                        Country : {lead.country}
                    </Typography>
                   
                    <Typography sx={{border:1, padding: 1, borderRadius: 1, margin: 1, fontWeight: 'bold', backgroundColor: 'whitesmoke', textTransform: 'capitalize' }}>
                        Organization : {lead.organization.organization_name}
                    </Typography>
                    



                </LeadsDetailContainer>
                <RemarksContainer>
                    <Typography variant="h6" sx={{ textAlign: "center" }}>{lead.remarks.length ?"Remarks":"no remarks yet"}</Typography>
                    {lead.remarks.slice(0).reverse().map((remark, index) => {
                        return (<>
                            <Stack key={index}
                                direction="column"
                                gap={1} p={2}
                                sx={{backgroundColor:"whitesmoke",margin:1}}
                            >
                                <Typography variant="subtitle1" sx={{  textTransform: 'capitalize' }}>
                                    Remark : <b>{remark.remark}</b>
                                </Typography>
                                <Typography variant="subtitle1" sx={{  textTransform: 'capitalize' }}>
                                    Remark Added By: <b><u>{remark.created_by.username}</u></b>
                                </Typography>
                                <Typography variant="subtitle1" sx={{  textTransform: 'capitalize' }}>
                                    Remark Added On :<b> {new Date(remark.created_at).toLocaleString()}</b>
                                </Typography>
                            </Stack>
                        </>)
                    })}
                </RemarksContainer >
            </Stack >
        </MainContainer >
    )
}
export default LeadDetailPage

