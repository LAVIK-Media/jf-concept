"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

type Category = "alle" | "car_service" | "folierungen" | "quads";

type GalleryItem = {
  id: string;
  src?: string;
  title: string;
  category: Exclude<Category, "alle">;
  meta: string;
};

const ITEMS: GalleryItem[] = [
  {
    id: "post-01",
    src: "/images/posts/post-01.jpeg",
    title: "Werkstatt Detail",
    category: "car_service",
    meta: "Diagnose · Präzision",
  },
  {
    id: "post-02",
    src: "/images/posts/post-02.jpeg",
    title: "Folierung Detail",
    category: "folierungen",
    meta: "Kanten · Finish",
  },
  {
    id: "post-03",
    src: "/images/posts/post-03.jpeg",
    title: "Off-Road Moment",
    category: "quads",
    meta: "Tirol · Action",
  },
  {
    id: "post-04",
    src: "/images/posts/post-04.jpeg",
    title: "Car Service",
    category: "car_service",
    meta: "Wartung · Setup",
  },
  // Placeholders (bis mehr echte Assets kommen)
  { id: "ph-01", title: "Folierung Mustang GT", category: "folierungen", meta: "Satin · Kanten" },
  { id: "ph-02", title: "Quad Tour (Tirol)", category: "quads", meta: "Staub · Grip" },
  { id: "ph-03", title: "Bremsen Service", category: "car_service", meta: "Safety · Spec" },
  { id: "ph-04", title: "Innenraum Detailing", category: "car_service", meta: "Clean · Detail" },
  { id: "ph-05", title: "Teilfolierung", category: "folierungen", meta: "Lines · Fit" },
  { id: "ph-06", title: "Quad Setup", category: "quads", meta: "Check · Ready" },
  { id: "ph-07", title: "Lackschutz", category: "folierungen", meta: "PPF · Shield" },
  { id: "ph-08", title: "Diagnose Station", category: "car_service", meta: "Data · Proof" },
];

const TABS: { id: Category; label: string }[] = [
  { id: "alle", label: "Alle" },
  { id: "car_service", label: "Car Service" },
  { id: "folierungen", label: "Folierungen" },
  { id: "quads", label: "Quads" },
];

export function Gallery() {
  const [active, setActive] = useState<Category>("alle");
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [current, setCurrent] = useState(0);

  const filtered = useMemo(() => {
    if (active === "alle") return ITEMS;
    return ITEMS.filter((i) => i.category === active);
  }, [active]);

  useEffect(() => {
    if (!carouselApi) return;
    const update = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
      setCurrent(carouselApi.selectedScrollSnap());
    };
    update();
    carouselApi.on("select", update);
    return () => {
      carouselApi.off("select", update);
    };
  }, [carouselApi]);

  useEffect(() => {
    // reset carousel when filter changes
    setCurrent(0);
    carouselApi?.scrollTo(0);
  }, [active, carouselApi]);

  return (
    <section id="galerie" className="bg-black" aria-label="Galerie">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="label">Galerie</p>
            <h2 className="mt-3 font-display text-4xl uppercase tracking-[0.03em] text-white md:text-5xl">
              Projekte. Posts. Details.
            </h2>
            <p className="mt-4 max-w-2xl text-[14px] leading-6 text-[var(--text-muted)]">
              Eine kuratierte Auswahl — klare Shots, saubere Linien, Technik im Fokus.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {TABS.map((t) => {
              const isActive = t.id === active;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setActive(t.id)}
                  className={[
                    "rounded-full border px-4 py-2",
                    "label !text-[10px]",
                    isActive
                      ? "border-[var(--accent)] bg-[color:color-mix(in_oklab,var(--accent)_18%,transparent)] text-white"
                      : "border-white/15 bg-white/5 text-white/70 hover:text-white",
                  ].join(" ")}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-12">
          <div className="flex items-end justify-between gap-6">
            <div className="hud-line flex-1 opacity-60" />
            <div className="hidden shrink-0 gap-2 md:flex">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => carouselApi?.scrollPrev()}
                disabled={!canScrollPrev}
                className="disabled:pointer-events-auto"
                aria-label="Zurück"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => carouselApi?.scrollNext()}
                disabled={!canScrollNext}
                className="disabled:pointer-events-auto"
                aria-label="Weiter"
              >
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="mt-8 w-full">
            <Carousel
              setApi={setCarouselApi}
              opts={{
                align: "start",
                containScroll: "trimSnaps",
                breakpoints: {
                  "(max-width: 768px)": { dragFree: true },
                },
              }}
            >
              <CarouselContent className="ml-0 md:ml-0">
                {filtered.map((item) => (
                  <CarouselItem
                    key={item.id}
                    className="max-w-[320px] pl-[14px] sm:max-w-[380px] lg:max-w-[420px]"
                  >
                    <a
                      href="#kontakt"
                      className="group block overflow-hidden rounded-2xl border border-white/10 bg-[color:var(--surface-1)]"
                      aria-label={`Projekt: ${item.title}`}
                    >
                      <div className="relative aspect-square w-full overflow-hidden">
                        {item.src ? (
                          <Image
                            src={item.src}
                            alt={item.title}
                            fill
                            sizes="(max-width: 1024px) 70vw, 420px"
                            className="object-cover opacity-90 transition duration-300 group-hover:scale-[1.03] group-hover:opacity-100"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-[color:var(--surface-2)]" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
                      </div>

                      <div className="p-6">
                        <p className="label text-white/60">{item.meta}</p>
                        <p className="mt-3 font-display text-2xl uppercase tracking-[0.03em] text-white">
                          {item.title}
                        </p>
                        <p className="mt-4 text-[13px] leading-6 text-white/60">
                          Saubere Kanten, klare Linien, technische Umsetzung — der Unterschied
                          liegt im Detail.
                        </p>

                        <div className="mt-6 flex items-center justify-between">
                          <span className="label text-white/70">Mehr ansehen</span>
                          <span className="label text-white/70">
                            ▶▶ <span className="text-white/40">JF</span>
                          </span>
                        </div>
                      </div>

                      <span className="pointer-events-none block h-[2px] origin-left scale-x-0 bg-[var(--accent)] transition-transform duration-300 group-hover:scale-x-100" />
                    </a>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            <div className="mt-8 flex items-center justify-center gap-2">
              {filtered.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={[
                    "h-2 w-2 rounded-full transition-colors",
                    current === idx ? "bg-[var(--accent)]" : "bg-white/20",
                  ].join(" ")}
                  onClick={() => carouselApi?.scrollTo(idx)}
                  aria-label={`Gehe zu Slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
