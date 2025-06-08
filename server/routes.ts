import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, loginSchema, insertContactSchema, type LoginData } from "@shared/schema";
import { ZodError } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({ message: "El usuario ya existe con este email" });
      }

      // Remove confirmPassword before creating user
      const { confirmPassword, ...userDataWithoutConfirm } = userData;
      const newUser = await storage.createUser(userDataWithoutConfirm);
      
      // Don't return password in response
      const { password, ...userResponse } = newUser;
      
      res.status(201).json({ 
        message: "Usuario creado exitosamente. Se ha enviado un email de confirmación.",
        user: userResponse 
      });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ 
          message: "Datos inválidos", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Error interno del servidor" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const loginData: LoginData = loginSchema.parse(req.body);
      
      const user = await storage.getUserByEmail(loginData.email);
      if (!user || user.password !== loginData.password) {
        return res.status(401).json({ message: "Credenciales inválidas" });
      }

      // Don't return password in response
      const { password, ...userResponse } = user;
      
      res.json({ 
        message: "Sesión iniciada exitosamente. Se ha enviado una confirmación a tu correo.",
        user: userResponse 
      });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ 
          message: "Datos inválidos", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Error interno del servidor" });
    }
  });

  // Package routes
  app.get("/api/packages/user/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ message: "ID de usuario inválido" });
      }

      const packages = await storage.getPackagesByUserId(userId);
      res.json(packages);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener paquetes" });
    }
  });

  app.get("/api/packages/track/:trackingId", async (req, res) => {
    try {
      const trackingId = req.params.trackingId;
      const packageInfo = await storage.getPackageByTrackingId(trackingId);
      
      if (!packageInfo) {
        return res.status(404).json({ message: "Paquete no encontrado" });
      }

      res.json(packageInfo);
    } catch (error) {
      res.status(500).json({ message: "Error al rastrear paquete" });
    }
  });

  app.patch("/api/packages/:trackingId/status", async (req, res) => {
    try {
      const { trackingId } = req.params;
      const { status, date } = req.body;
      
      const updatedPackage = await storage.updatePackageStatus(
        trackingId, 
        status, 
        date ? new Date(date) : undefined
      );
      
      if (!updatedPackage) {
        return res.status(404).json({ message: "Paquete no encontrado" });
      }

      res.json(updatedPackage);
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar estado del paquete" });
    }
  });

  // Contact routes
  app.post("/api/contact", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const newContact = await storage.createContact(contactData);
      
      res.status(201).json({ 
        message: "Mensaje enviado exitosamente. Te contactaremos dentro de 24 horas.",
        contact: newContact 
      });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ 
          message: "Datos inválidos", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Error al enviar mensaje" });
    }
  });

  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener contactos" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
