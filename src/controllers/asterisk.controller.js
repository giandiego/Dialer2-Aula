import AMI from '../libs/ami';

//asterisk
export const OriginateCall = async (req, res) => {
    try {
        const s = req.body,
            i = s.Data;

        if (!i || !i.phone || !i.code || !i.ringtime || !i.nombre || s.Action !== 'OriginateCall') {
            throw new Error("Arguments are missing in your query.");
        }


        const variables = {
            ringtime: i.ringtime,
            CallerID: i.CallerID,
            //"CDR(accountcode)": i.code,
            Nombre: i.nombre,
        };


        let DataAMI = {
            Action: "Originate",
            //actionid: CampaignData.ActionID,
            Channel: "Local/" + i.phone + "@DIALER/n",
            Context: "internal",
            Exten: "s",
            Priority: 1,
            CallerID: i.CallerID,
            Async: "true",
            Variable: variables,
        };
        let action = await ActionAMI(DataAMI);

        res.json({ success: true, message: action });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Something goes wrong retriving the OriginateCall",
        });
    }
};

//Llamamos

//Llamamos
async function ActionAMI(DataAMI) {

    return new Promise((resolve) => {
        AMI.action(DataAMI, function (err, res) {
            err
                ? (console.log("response error :", err.message), resolve(err.message))
                : resolve(res);
        });
    });

}