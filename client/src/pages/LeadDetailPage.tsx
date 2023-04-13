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
    return (
        <MainContainer>
            <Stack direction={"column"}>
                <LeadsDetailContainer>
                    <Typography sx={{ padding: 2, border: 1, fontWeight: 'bold', backgrounColor: 'lightgrey', textTransform: 'capitalize' }}>
                        Lead : {lead.name}
                    </Typography>
                    <Typography sx={{ padding: 2, border: 1, fontWeight: 'bold', backgrounColor: 'lightgrey', textTransform: 'capitalize' }}>
                        Stage : {lead.stage}
                    </Typography>
                    <Typography sx={{ padding: 2, border: 1, fontWeight: 'bold', backgrounColor: 'lightgrey', textTransform: 'capitalize' }}>
                        Work Description : {lead.work_description}
                    </Typography>
                    <Typography sx={{ padding: 2, border: 1, fontWeight: 'bold', backgrounColor: 'lightgrey', textTransform: 'capitalize' }}>
                        TurnOver : {lead.turnover}
                    </Typography>

                    <Typography sx={{ padding: 2, border: 1, fontWeight: 'bold', backgrounColor: 'lightgrey', textTransform: 'capitalize' }}>
                        Lead Type : {lead.lead_type}
                    </Typography>
                    <Typography sx={{ padding: 2, border: 1, fontWeight: 'bold', backgrounColor: 'lightgrey', textTransform: 'capitalize' }}>
                        Customer Name : {lead.customer_name}
                    </Typography>
                    {/* divider */}
                    <Typography sx={{ padding: 2, border: 1, fontWeight: 'bold', backgrounColor: 'lightgrey', textTransform: 'capitalize' }}>
                        Mobile : {lead.mobile}
                    </Typography>
                    <Typography sx={{ padding: 2, border: 1, fontWeight: 'bold', backgrounColor: 'lightgrey', textTransform: 'capitalize' }}>
                        Mobile2 : {lead.alternate_mobile1}
                    </Typography>
                    {/* divider */}
                    <Typography sx={{ padding: 2, border: 1, fontWeight: 'bold', backgrounColor: 'lightgrey', textTransform: 'capitalize' }}>
                        Mobile3 : {lead.alternate_mobile2}
                    </Typography>
                    <Typography sx={{ padding: 2, border: 1, fontWeight: 'bold', backgrounColor: 'lightgrey', textTransform: 'capitalize' }}>
                        Lead Source : {lead.lead_source}
                    </Typography>
                    {/* divider */}
                    <Typography sx={{ padding: 2, border: 1, fontWeight: 'bold', backgrounColor: 'lightgrey', textTransform: 'capitalize' }}>
                        Lead Owner : {lead.lead_owner.username}
                    </Typography>
                    <Typography sx={{ padding: 2, border: 1, fontWeight: 'bold', backgrounColor: 'lightgrey', textTransform: 'capitalize' }}>
                        Created On : {new Date(lead.created_at).toLocaleString()}
                    </Typography>
                    <Typography sx={{ padding: 2, border: 1, fontWeight: 'bold', backgrounColor: 'lightgrey', textTransform: 'capitalize' }}>
                        Lead Source : {lead.lead_source}
                    </Typography>
                    {/* divider */}
                    <Typography sx={{ padding: 2, border: 1, fontWeight: 'bold', backgrounColor: 'lightgrey', textTransform: 'capitalize' }}>
                        Last Updated : {new Date(lead.updated_at).toLocaleString()}
                    </Typography>
                    <Typography sx={{ padding: 2, border: 1, fontWeight: 'bold', backgrounColor: 'lightgrey', textTransform: 'capitalize' }}>
                        Address : {lead.address}
                    </Typography>
                    <Typography sx={{ padding: 2, border: 1, fontWeight: 'bold', backgrounColor: 'lightgrey', textTransform: 'capitalize' }}>
                        Station : {lead.city}
                    </Typography>  <Typography sx={{ padding: 2, border: 1, fontWeight: 'bold', backgrounColor: 'lightgrey', textTransform: 'capitalize' }}>
                        State : {lead.state}
                    </Typography>
                    <Typography sx={{ padding: 2, border: 1, fontWeight: 'bold', backgrounColor: 'lightgrey', textTransform: 'capitalize' }}>
                        Email1 : {lead.email}
                    </Typography>
                    <Typography sx={{ padding: 2, border: 1, fontWeight: 'bold', backgrounColor: 'lightgrey', textTransform: 'capitalize' }}>
                        Email2 : {lead.alternate_email}
                    </Typography>
                </LeadsDetailContainer>
                <RemarksContainer>
                    <Typography variant="h6" sx={{ textAlign: "center" }}>Remarks</Typography>
                    {lead.remarks.slice(0).reverse().map((remark, index) => {
                        return (<>
                            <Stack key={index}
                                direction="column"
                                gap={1} p={2}
                                sx={{ border: 1 }}
                            >
                                <Typography variant="subtitle1" sx={{ backgrounColor: 'lightgrey', textTransform: 'capitalize' }}>
                                    Remark : <b>{remark.remark}</b>
                                </Typography>
                                <Typography variant="subtitle1" sx={{ backgrounColor: 'lightgrey', textTransform: 'capitalize' }}>
                                    Remark Added By: {remark.created_by.username}
                                </Typography>
                                <Typography variant="subtitle1" sx={{ backgrounColor: 'lightgrey', textTransform: 'capitalize' }}>
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

