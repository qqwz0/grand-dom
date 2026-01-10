"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Building2, Sparkles } from "lucide-react";
import { Card, CardContent } from "./ui/card";

export default function RealEstateServicesSection({
  get,
  realEstateServices,
  router,
  currentLanguage,
}: any) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Title animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="h-8 w-8 text-green-500" />
            <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              {get(["realEstateServicesTitle"], "Nasze Usługi")}
            </h2>
          </div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            {get(
              ["realEstateServicesSubtitle"],
              "Kompleksowe rozwiązania dostosowane do Twoich potrzeb na warszawskim rynku nieruchomości."
            )}
          </p>
        </motion.div>

        {/* List stagger */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="space-y-6"
        >
          {realEstateServices.map((service: any, idx: number) => {
            const Icon = service.icon ?? Building2;

            return (
              <motion.div key={service.title ?? idx} variants={item}>
                <Card
                  className="p-0 bg-white/60 border-green-200 backdrop-blur-sm hover:bg-white hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group overflow-hidden cursor-pointer"
                  onClick={() =>
                    router.push(`/${currentLanguage.code}/contact`, {
                      scroll: false,
                    })
                  }
                >
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row items-stretch">
                      {/* Icon Section */}
                      <div className="md:w-48 bg-gradient-to-br from-green-500 to-teal-500 p-8 flex items-center justify-center group-hover:from-green-600 group-hover:to-teal-600 transition-all duration-300">
                        <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                          <Icon className="h-12 w-12 text-white" />
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
                        <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-green-600 transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {service.description}
                        </p>

                        {service.features?.length > 0 && (
                          <div className="flex flex-wrap gap-3">
                            {service.features.map(
                              (feature: string, i: number) => (
                                <div
                                  key={i}
                                  className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-full text-sm text-gray-700 group-hover:bg-green-100 transition-colors"
                                >
                                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                                  {feature}
                                </div>
                              )
                            )}
                          </div>
                        )}
                      </div>

                      {/* Arrow indicator */}
                      <div className="hidden md:flex items-center justify-center w-16 bg-gradient-to-l from-green-50 to-transparent group-hover:from-green-100 transition-colors">
                        <ArrowRight className="h-6 w-6 text-green-500 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
