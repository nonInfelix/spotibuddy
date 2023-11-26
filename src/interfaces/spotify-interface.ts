export interface SPlaylist {
  href: string;
  items: SPlaylistItems[];
  limit: number;
  next: string | null;
  offset: number;
  previous: any;
  total: number;
}

export interface SPlaylistItems {
  description: string;
  href: string;
  id: string;
  images: Array<{}>;
  name: string;
  tracks: {
    href: string;
    total: number;
  };
}
export interface SUser {
  country: string;
  display_name: string;
  email: string;
  id: string;
  images: Array<any>;
  type: string;
}
