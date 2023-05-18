export class Clip {
    clip_id: number;
    clip_title: string;
    clip_title_english: string;
    clip_text: string;
    clip_text_english: string;
    clip_type: string;
    date_of_clip: string;
    clip_url: string;
    cluster_url:string;
    created_at: string;
    created_at_time: string;
    brief: string;
    brief_english: string;
    important_information: boolean;
    clip_image_url: string;
    clip_group: number;
    main_clip: boolean;
    isWeb: boolean;
    isPrinted: boolean;
    isRadio: boolean;  
    isTV: boolean;
    isSocial: boolean;
    medium_name_cyrilic: string;
    medium_name: string;
    medium: {
        medium_id: number,
        medium_name_cyrilic: string,
        medium_name: string,
        mediumType: {
            medium_type_id: number,
            medium_type_name: string
        }
    }
}