export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      event_natures: {
        Row: {
          alt_name: string | null;
          created_at: string;
          id: number;
          label: string;
          priority: number;
          timer_duration: number;
        };
        Insert: {
          alt_name?: string | null;
          created_at?: string;
          id?: number;
          label: string;
          priority?: number;
          timer_duration?: number;
        };
        Update: {
          alt_name?: string | null;
          created_at?: string;
          id?: number;
          label?: string;
          priority?: number;
          timer_duration?: number;
        };
        Relationships: [];
      };
      event_notes: {
        Row: {
          created_at: string;
          event_id: number;
          id: number;
          text_content: string;
        };
        Insert: {
          created_at?: string;
          event_id: number;
          id?: number;
          text_content: string;
        };
        Update: {
          created_at?: string;
          event_id?: number;
          id?: number;
          text_content?: string;
        };
        Relationships: [
          {
            foreignKeyName: "event_notes_event_id_fkey";
            columns: ["event_id"];
            isOneToOne: false;
            referencedRelation: "events";
            referencedColumns: ["id"];
          }
        ];
      };
      event_statuses: {
        Row: {
          created_at: string;
          id: number;
          label: string;
          timer_duration: number | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          label: string;
          timer_duration?: number | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          label?: string;
          timer_duration?: number | null;
        };
        Relationships: [];
      };
      events: {
        Row: {
          created_at: string;
          display_station: number;
          disposition: string | null;
          id: number;
          location: string | null;
          nature: number;
          note_count: number;
          primary_unit: string | null;
          priority: number;
          rp_name: string | null;
          rp_phone: string | null;
          status: number | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          display_station: number;
          disposition?: string | null;
          id?: number;
          location?: string | null;
          nature?: number;
          note_count?: number;
          primary_unit?: string | null;
          priority?: number;
          rp_name?: string | null;
          rp_phone?: string | null;
          status?: number | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          display_station?: number;
          disposition?: string | null;
          id?: number;
          location?: string | null;
          nature?: number;
          note_count?: number;
          primary_unit?: string | null;
          priority?: number;
          rp_name?: string | null;
          rp_phone?: string | null;
          status?: number | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "events_display_station_fkey";
            columns: ["display_station"];
            isOneToOne: false;
            referencedRelation: "stations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "events_nature_fkey";
            columns: ["nature"];
            isOneToOne: false;
            referencedRelation: "event_natures";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "events_primary_unit_fkey";
            columns: ["primary_unit"];
            isOneToOne: false;
            referencedRelation: "units";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "events_status_fkey";
            columns: ["status"];
            isOneToOne: false;
            referencedRelation: "event_statuses";
            referencedColumns: ["id"];
          }
        ];
      };
      locations_old: {
        Row: {
          city_name: string | null;
          common_name: string | null;
          county_name: string | null;
          created_at: string | null;
          direction: Database["public"]["Enums"]["directions_old"] | null;
          exit_num: string | null;
          ft_pt: string | null;
          id: string;
          location: unknown | null;
          milepost: number | null;
          mun_code: string | null;
          name: string;
          name_1: string | null;
          name_2: string | null;
          name_3: string | null;
          name_4: string | null;
          road: string | null;
          roadway: string | null;
          station_area: string | null;
          station_old: string | null;
          troop_old: string | null;
          type: Database["public"]["Enums"]["location_type_old"] | null;
          unit_old: string | null;
          x_old: number | null;
          y_old: number | null;
          zip_code: string | null;
        };
        Insert: {
          city_name?: string | null;
          common_name?: string | null;
          county_name?: string | null;
          created_at?: string | null;
          direction?: Database["public"]["Enums"]["directions_old"] | null;
          exit_num?: string | null;
          ft_pt?: string | null;
          id?: string;
          location?: unknown | null;
          milepost?: number | null;
          mun_code?: string | null;
          name: string;
          name_1?: string | null;
          name_2?: string | null;
          name_3?: string | null;
          name_4?: string | null;
          road?: string | null;
          roadway?: string | null;
          station_area?: string | null;
          station_old?: string | null;
          troop_old?: string | null;
          type?: Database["public"]["Enums"]["location_type_old"] | null;
          unit_old?: string | null;
          x_old?: number | null;
          y_old?: number | null;
          zip_code?: string | null;
        };
        Update: {
          city_name?: string | null;
          common_name?: string | null;
          county_name?: string | null;
          created_at?: string | null;
          direction?: Database["public"]["Enums"]["directions_old"] | null;
          exit_num?: string | null;
          ft_pt?: string | null;
          id?: string;
          location?: unknown | null;
          milepost?: number | null;
          mun_code?: string | null;
          name?: string;
          name_1?: string | null;
          name_2?: string | null;
          name_3?: string | null;
          name_4?: string | null;
          road?: string | null;
          roadway?: string | null;
          station_area?: string | null;
          station_old?: string | null;
          troop_old?: string | null;
          type?: Database["public"]["Enums"]["location_type_old"] | null;
          unit_old?: string | null;
          x_old?: number | null;
          y_old?: number | null;
          zip_code?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "locations_station_area_fkey";
            columns: ["station_area"];
            isOneToOne: false;
            referencedRelation: "stations";
            referencedColumns: ["display"];
          }
        ];
      };
      roles: {
        Row: {
          created_at: string;
          id: number;
          label: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          label: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          label?: string;
        };
        Relationships: [];
      };
      stations: {
        Row: {
          created_at: string;
          display: string;
          id: number;
          name: string;
          troop: Database["public"]["Enums"]["troop_identifier"];
        };
        Insert: {
          created_at?: string;
          display: string;
          id?: number;
          name: string;
          troop: Database["public"]["Enums"]["troop_identifier"];
        };
        Update: {
          created_at?: string;
          display?: string;
          id?: number;
          name?: string;
          troop?: Database["public"]["Enums"]["troop_identifier"];
        };
        Relationships: [];
      };
      unit_statuses: {
        Row: {
          created_at: string;
          id: number;
          is_on_duty: boolean;
          label: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          is_on_duty?: boolean;
          label: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          is_on_duty?: boolean;
          label?: string;
        };
        Relationships: [];
      };
      units: {
        Row: {
          assigned_vehicle: string | null;
          assignment: string | null;
          badge_number: string;
          created_at: string;
          first_name: string | null;
          id: string;
          last_name: string | null;
          phone_number: string | null;
          rank: string | null;
          status: number;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          assigned_vehicle?: string | null;
          assignment?: string | null;
          badge_number: string;
          created_at?: string;
          first_name?: string | null;
          id?: string;
          last_name?: string | null;
          phone_number?: string | null;
          rank?: string | null;
          status?: number;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          assigned_vehicle?: string | null;
          assignment?: string | null;
          badge_number?: string;
          created_at?: string;
          first_name?: string | null;
          id?: string;
          last_name?: string | null;
          phone_number?: string | null;
          rank?: string | null;
          status?: number;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "units_assigned_vehicle_fkey";
            columns: ["assigned_vehicle"];
            isOneToOne: false;
            referencedRelation: "vehicles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "units_status_fkey";
            columns: ["status"];
            isOneToOne: false;
            referencedRelation: "unit_statuses";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "units_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      users: {
        Row: {
          created_at: string;
          full_name: string;
          id: string;
        };
        Insert: {
          created_at?: string;
          full_name: string;
          id?: string;
        };
        Update: {
          created_at?: string;
          full_name?: string;
          id?: string;
        };
        Relationships: [];
      };
      vehicles: {
        Row: {
          created_at: string;
          display: string;
          id: string;
        };
        Insert: {
          created_at?: string;
          display: string;
          id?: string;
        };
        Update: {
          created_at?: string;
          display?: string;
          id?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_locations_by_name_old: {
        Args: {
          p_search_text: string;
          p_result_limit?: number;
        };
        Returns: {
          id: string;
          name: string;
          location: unknown;
          created_at: string;
          station_area: string;
          type: Database["public"]["Enums"]["location_type_old"];
          road: string;
          roadway: string;
          milepost: number;
          direction: Database["public"]["Enums"]["directions_old"];
          city_name: string;
          county_name: string;
          zip_code: string;
          common_name: string;
          name_1: string;
          name_2: string;
          name_3: string;
          name_4: string;
          mun_code: string;
          station_old: string;
          ft_pt: string;
          troop_old: string;
          unit_old: string;
          exit_num: string;
          x_old: number;
          y_old: number;
          rank: number;
        }[];
      };
      get_nearest_locations_old: {
        Args: {
          p_lng: number;
          p_lat: number;
          p_max_distance: number;
          p_result_limit?: number;
        };
        Returns: {
          id: string;
          name: string;
          location: unknown;
          created_at: string;
          station_area: string;
          type: Database["public"]["Enums"]["location_type_old"];
          road: string;
          roadway: string;
          milepost: number;
          direction: Database["public"]["Enums"]["directions_old"];
          city_name: string;
          county_name: string;
          zip_code: string;
          common_name: string;
          name_1: string;
          name_2: string;
          name_3: string;
          name_4: string;
          mun_code: string;
          station_old: string;
          ft_pt: string;
          troop_old: string;
          unit_old: string;
          exit_num: string;
          x_old: number;
          y_old: number;
          distance: number;
        }[];
      };
    };
    Enums: {
      directions_old: "N" | "S" | "E" | "W" | "T" | "L";
      location_type_old:
        | "milepost"
        | "ramp"
        | "toll_plaza"
        | "service_plaza"
        | "u_turn"
        | "parking"
        | "entrance"
        | "exit"
        | "cut"
        | "underpass"
        | "overpass"
        | "rest_area"
        | "bridge"
        | "school";
      troop_identifier: "A" | "B" | "C" | "D";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
      PublicSchema["Views"])
  ? (PublicSchema["Tables"] &
      PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
  ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never;
