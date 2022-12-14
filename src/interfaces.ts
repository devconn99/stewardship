export type PrimaryKey = number;

export type UrlString = string;

export interface Org {
  pk: PrimaryKey;
  name: string;
  contact_first_name: string;
  contact_last_name: string;
  support_email: string;
}

export interface BlackbaudConnection {
  linked_entity_name: string;
  linked_user_email: string;
  connection_successful: boolean;
}

export interface AdminOrg extends Org {
  blackbaud_connection?: BlackbaudConnection;
}

export interface OrgMembership {
  org: Org;
  is_org_admin: boolean;
}

export interface User {
  pk: PrimaryKey;
  email: string;
  avatar?: UrlString;
  first_name: string;
  last_name: string;
  is_staff: boolean;
  membership?: OrgMembership;
}

export interface Task {
  pk: PrimaryKey;
  slug: string;
  title: string;
  description: string;
  description_short: string;
  description_plaintext: string;
  donors: any[];
  status: TaskStatusStr;
  author: User;
  author_pk: PrimaryKey;
  assignees: User[];
  assignees_pks: PrimaryKey[];
  org: PrimaryKey;
  created_at: string;
  comments: Comment[];
  comments_count: number;
}

export interface DropdownOption<Value = any> {
  id: string | number;
  value: Value;
  label?: any;
  bg?: string;
  color?: string;

  [key: string]: any;
}

export interface Comment {
  pk: PrimaryKey;
  parent: PrimaryKey;
  task: PrimaryKey;
  author: User;
  content: string;
  children: Array<Comment> | null;
  updated_at: string;
  created_at: string;
}

export type TaskStatusStr =
  "pending" |
  "recommended" |
  "recommendation_declined" |
  "review" |
  "scheduled" |
  "in_progress" |
  "completed" |
  "failed" |
  "archived";

export interface FiscExport {
  pk: PrimaryKey;
  org: PrimaryKey;
  date: string;
  is_downloaded: boolean;
  gifts_export_url: UrlString;
  optout_export_url: UrlString;
  num_scans: number;
  num_scans_unread: number;
  num_gifts: number;
  num_optouts: number;
  donation_total: number;
  file_name: string;
}

export interface FiscGift {
  pk: PrimaryKey;
  donor_id: PrimaryKey;
  is_existing_donor: boolean;
  first_name: string;
  last_name: string;
  salutation: string;
  home_phone: string;
  opt_line: string;
  email: string;
  org_rec: string;
  donor_type: string;
  address: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  gift_date: string;
  amount: string;
  ty_letter_no: string;
  taxyear: string;
  reference: string;
  gift_type: string;
  gl_code: string;
  solicit_code: string;
  campaign: string;
  sub_solicit_code: string;
  gift_narrative: string;
  record_type: string;
  flags: string;
  memory_honor: string;
  gfname: string;
  glname: string;
  export: string;
}

export interface FiscOptOut {
  pk: PrimaryKey;
  scan: PrimaryKey;
  first_name: string;
  last_name: string;
  address: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
}

export interface FiscScan {
  pk: PrimaryKey;
  gift?: FiscGift;
  optout?: FiscOptOut;
  is_existing_donor: boolean;
  image_front: UrlString;
  image_back: UrlString;
  account: number;
  donor_id: number;
  date?: string;
  amount: string;
  is_viewed: boolean;
  is_duplicated: boolean;
}

export interface LetterSegment {
  pk: PrimaryKey;
  name: string;
  description?: string;
  template: LetterTemplate;
  is_recurring: boolean;
  donation_amount_min: URL;
  donation_amount_max: URL;
  donation_amount_total_min: number;
  donation_amount_total_max: number;
  created_at: string;
  updated_at: string;
}

export interface LetterBatch {
  pk: PrimaryKey;
  segment: LetterSegment;
  count: number;
  is_downloaded: boolean;
  docx_file: UrlString;
  created_at: string;
  updated_at: string;
}

export interface LetterTemplate {
  pk: PrimaryKey;
  name: string;
  description?: string;
  template_file_docx: UrlString;
  template_file_img: UrlString;
  merge_variables: Map<string, string>;
  created_at: string;
  updated_at: string;
}
