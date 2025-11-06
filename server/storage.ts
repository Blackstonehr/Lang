import { 
  type User, 
  type InsertUser,
  type Program,
  type InsertProgram,
  type ContactSubmission,
  type InsertContactSubmission 
} from "@shared/schema";
import { randomUUID } from "crypto";

// Storage interface for all CRUD operations
export interface IStorage {
  // User operations (existing)
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Program operations
  getAllPrograms(): Promise<Program[]>;
  getFeaturedPrograms(): Promise<Program[]>;
  getProgramById(id: string): Promise<Program | undefined>;
  getProgramsByLevel(level: string): Promise<Program[]>;
  createProgram(program: InsertProgram): Promise<Program>;
  
  // Contact submission operations
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getAllContactSubmissions(): Promise<ContactSubmission[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private programs: Map<string, Program>;
  private contactSubmissions: Map<string, ContactSubmission>;

  constructor() {
    this.users = new Map();
    this.programs = new Map();
    this.contactSubmissions = new Map();
    
    // Initialize with sample programs
    this.initializeSamplePrograms();
  }

  private initializeSamplePrograms() {
    const samplePrograms: InsertProgram[] = [
      {
        destination: "Tokyo, Japan",
        country: "Japan",
        title: "Tokyo Summer Language & Culture Immersion",
        description: "Experience the perfect blend of language learning and cultural immersion in the heart of Tokyo. Study Japanese in small classes while exploring ancient temples, modern technology hubs, and traditional cuisine.",
        duration: "4 weeks",
        startDate: "July 2025",
        endDate: "August 2025",
        price: 4500,
        level: "High School & College",
        highlights: [
          "20 hours/week intensive Japanese language classes",
          "Cultural activities: tea ceremony, calligraphy, cooking classes",
          "Visits to Tokyo Tower, Senso-ji Temple, and Akihabara",
          "Host family accommodation for authentic experience",
          "Weekend trips to Mt. Fuji and Kyoto"
        ],
        imageUrl: "@assets/generated_images/Students_in_Tokyo_hero_366c34fa.png",
        featured: "true",
        spotsAvailable: 12
      },
      {
        destination: "Seoul, South Korea",
        country: "South Korea",
        title: "Seoul K-Culture & Business Program",
        description: "Dive into South Korea's dynamic culture and booming economy. Combine Korean language study with business workshops, K-pop culture experiences, and tech industry visits in one of Asia's most exciting cities.",
        duration: "6 weeks",
        startDate: "June 2025",
        endDate: "August 2025",
        price: 5200,
        level: "College & 18+",
        highlights: [
          "Korean language courses (beginner to advanced)",
          "Business workshops at leading Seoul companies",
          "K-pop dance classes and studio tours",
          "Tech startup incubator visits in Gangnam",
          "Weekend trips to DMZ and Busan"
        ],
        imageUrl: "@assets/generated_images/Students_in_Korea_hero_f1ab5dd2.png",
        featured: "true",
        spotsAvailable: 15
      },
      {
        destination: "Barcelona, Spain",
        country: "Spain",
        title: "Barcelona Arts & Spanish Language",
        description: "Immerse yourself in Spanish language and Mediterranean culture in vibrant Barcelona. Study Spanish while exploring Gaudí's architecture, Mediterranean beaches, and world-class museums.",
        duration: "8 weeks",
        startDate: "June 2025",
        endDate: "August 2025",
        price: 5800,
        level: "High School & College",
        highlights: [
          "Intensive Spanish language instruction",
          "Art history classes at MACBA and Picasso Museum",
          "Cooking classes: paella, tapas, and Catalan cuisine",
          "Beach volleyball and Mediterranean activities",
          "Day trips to Montserrat and Costa Brava"
        ],
        imageUrl: "@assets/generated_images/Students_studying_together_hero_65ed8f9a.png",
        featured: "true",
        spotsAvailable: 18
      },
      {
        destination: "Paris, France",
        country: "France",
        title: "Paris Language & Fashion Design",
        description: "Study French in the city of lights while exploring fashion, art, and cuisine. Perfect for students interested in design, culinary arts, or French culture.",
        duration: "5 weeks",
        startDate: "July 2025",
        endDate: "August 2025",
        price: 6200,
        level: "College & 18+",
        highlights: [
          "French language courses at Sorbonne partner school",
          "Fashion design workshops in Le Marais",
          "Visits to Louvre, Musée d'Orsay, and Versailles",
          "French cooking classes with professional chefs",
          "Student apartment accommodation in Latin Quarter"
        ],
        imageUrl: "@assets/generated_images/Students_studying_together_hero_65ed8f9a.png",
        featured: "false",
        spotsAvailable: 10
      }
    ];

    samplePrograms.forEach(program => {
      const id = randomUUID();
      this.programs.set(id, { ...program, id, featured: program.featured || "false" });
    });
  }

  // User methods (existing)
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Program methods
  async getAllPrograms(): Promise<Program[]> {
    return Array.from(this.programs.values());
  }

  async getFeaturedPrograms(): Promise<Program[]> {
    return Array.from(this.programs.values()).filter(p => p.featured === "true");
  }

  async getProgramById(id: string): Promise<Program | undefined> {
    return this.programs.get(id);
  }

  async getProgramsByLevel(level: string): Promise<Program[]> {
    return Array.from(this.programs.values()).filter(p => 
      p.level.includes(level)
    );
  }

  async createProgram(insertProgram: InsertProgram): Promise<Program> {
    const id = randomUUID();
    const program: Program = { 
      ...insertProgram,
      id,
      featured: insertProgram.featured ?? "false"
    };
    this.programs.set(id, program);
    return program;
  }

  // Contact submission methods
  async createContactSubmission(insertSubmission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = randomUUID();
    const submission: ContactSubmission = {
      ...insertSubmission,
      phone: insertSubmission.phone ?? null,
      programInterest: insertSubmission.programInterest ?? null,
      id,
      createdAt: new Date(),
    };
    this.contactSubmissions.set(id, submission);
    return submission;
  }

  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    return Array.from(this.contactSubmissions.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
}

export const storage = new MemStorage();
