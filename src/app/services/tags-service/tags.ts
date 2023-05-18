export class Tags {
    tag_id: number;
    tag_name_c: string;
    tag_name_l: string;
    tag_color: string;
    tags_category_id: number;
    parent_tag: boolean;
    parent_tag_id: number;
    tags_category:{
        tags_category_id:number,
        tags_category_name: string
    }
}
