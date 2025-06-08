import { users, packages, contacts, type User, type InsertUser, type Package, type InsertPackage, type Contact, type InsertContact } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: Omit<InsertUser, 'confirmPassword'>): Promise<User>;
  
  // Packages
  getPackagesByUserId(userId: number): Promise<Package[]>;
  getPackageByTrackingId(trackingId: string): Promise<Package | undefined>;
  createPackage(packageData: InsertPackage & { userId: number }): Promise<Package>;
  updatePackageStatus(trackingId: string, status: string, date?: Date): Promise<Package | undefined>;
  
  // Contacts
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(userData: Omit<InsertUser, 'confirmPassword'>): Promise<User> {
    const [user] = await db
      .insert(users)
      .values({
        ...userData,
        mailboxId: `#EV${String(Date.now()).slice(-5)}`
      })
      .returning();
    return user;
  }

  async getPackagesByUserId(userId: number): Promise<Package[]> {
    return await db.select().from(packages).where(eq(packages.userId, userId));
  }

  async getPackageByTrackingId(trackingId: string): Promise<Package | undefined> {
    const [pkg] = await db.select().from(packages).where(eq(packages.trackingId, trackingId));
    return pkg || undefined;
  }

  async createPackage(packageData: InsertPackage & { userId: number }): Promise<Package> {
    const trackingId = `#EV${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;
    
    const [newPackage] = await db
      .insert(packages)
      .values({
        ...packageData,
        trackingId,
        receivedDate: new Date(),
      })
      .returning();
    
    return newPackage;
  }

  async updatePackageStatus(trackingId: string, status: string, date?: Date): Promise<Package | undefined> {
    const updateDate = date || new Date();
    const updateData: any = { status };

    // Update relevant date field based on status
    switch (status) {
      case 'transit':
        updateData.transitDate = updateDate;
        break;
      case 'arrived':
        updateData.arrivedDate = updateDate;
        break;
      case 'ready':
        updateData.readyDate = updateDate;
        break;
      case 'delivered':
        updateData.deliveredDate = updateDate;
        break;
    }

    const [updatedPackage] = await db
      .update(packages)
      .set(updateData)
      .where(eq(packages.trackingId, trackingId))
      .returning();

    return updatedPackage || undefined;
  }

  async createContact(contactData: InsertContact): Promise<Contact> {
    const [contact] = await db
      .insert(contacts)
      .values(contactData)
      .returning();
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return await db.select().from(contacts);
  }
}

export const storage = new DatabaseStorage();
