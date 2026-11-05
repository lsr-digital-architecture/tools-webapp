import express, { type Express } from 'express';
import cors, { type CorsOptions } from 'cors';
import type { PrismaClient } from '@prisma/client';
import { PrismaShortLinkRepository } from '@/infrastructure/database/prisma-short-link.repository';
import { CryptoCodeGenerator } from '@/infrastructure/services/crypto-code-generator.service';
import { ShortenUrlUseCase } from '@/application/use-cases/shorten-url.use-case';
import { GetOriginalUrlUseCase } from '@/application/use-cases/get-original-url.use-case';
import { ShortenUrlController } from '@/presentation/controllers/shorten-url.controller';
import { RedirectUrlController } from '@/presentation/controllers/redirect-url.controller';
import { createShortLinkRouter } from '@/presentation/routes/short-link.routes';

function resolveCorsOrigin(): CorsOptions['origin'] {
  const raw = process.env.CORS_ORIGINS?.trim();
  if (!raw || raw === '*') {
    return true;
  }
  const allowed = raw
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
  return allowed.length === 0 ? true : allowed;
}

export function createExpressApp(prisma: PrismaClient): Express {
  const app = express();

  app.use(cors({ origin: resolveCorsOrigin() }));
  app.use(express.json());

  // Wire up dependencies (Clean Architecture Dependency Injection)
  const shortLinkRepository = new PrismaShortLinkRepository(prisma);
  const codeGenerator = new CryptoCodeGenerator();

  const shortenUrlUseCase = new ShortenUrlUseCase(shortLinkRepository, codeGenerator);
  const getOriginalUrlUseCase = new GetOriginalUrlUseCase(shortLinkRepository);

  const shortenUrlController = new ShortenUrlController(shortenUrlUseCase);
  const redirectUrlController = new RedirectUrlController(getOriginalUrlUseCase);

  const router = createShortLinkRouter(shortenUrlController, redirectUrlController);
  app.use(router);

  return app;
}
