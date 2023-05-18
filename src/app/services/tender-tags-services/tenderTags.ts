export class TenderTags {
    tender_tag_id: number;
    //tender_id: number;
    //tag_id: number;
        tender: {
            tender_id: number,
            tender_type: string,
            tender_medium: string,
            tender_document: string,
            tender_subject: string,
            tender_description: string,
            tender_url: string,
            tender_date: string,
            tender_expire: string,
            isPonistuvanje: boolean,
            isPrilog: boolean,
            processNumber: string,
            contractingInstitutionName: string,
            subject: string,
            goodsWorksServices: string,
            entityProcedureType: string,
            announcementDate: string,
            finalDay: string,
            devided: true,
            prilog: false,
            ponistuvanje: false
        }
        tag: {
            tag_id: number,
            tag_name_c: string,
            tag_name_l: string,
            tag_color: string,
            parent_tag: true,
            parent_tag_id: number,
            tags_category: {
                tags_category_id: number,
                tags_category_name: string
            }
        }
}