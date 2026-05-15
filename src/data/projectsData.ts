export type Project = {
  id: number;
  title: string;
  category: string;
  description: string;
  img: string;
  gallery?: string[];
  specs?: {
    erectedHeight?: string;
    retractedHeight?: string;
    headLoad?: string;
    totalWeight?: string;
  };
};

export const CATEGORIES = [
  "Show All",
  "3D Modeling of Products",
  "Industrial Hydraulics & SPM",
  "Telescopic Mast",
  "Aerospace and Defence Components",
] as const;

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Counterpoise Earthing System",
    category: "3D Modeling of Products",
    description:
      "Critical radar communication infrastructure earthing system engineered to mil-spec tolerances for naval deployments.",
    img: "/AllProjects/Counterpoise Earthing System- Radar Communication.jpg",
  },
  {
    id: 2,
    title: "OFF Gas Treatment Plant",
    category: "3D Modeling of Products",
    description:
      "Detailed 3D model of a gas scrubbing and treatment plant, capturing all process lines and structural elements.",
    img: "/AllProjects/OFF Gas Treatment Plant.jpg",
  },
  {
    id: 3,
    title: "Solvent Extraction Plant Layout",
    category: "3D Modeling of Products",
    description:
      "Full-plant 3D visualization of a solvent extraction facility, used for engineering reviews and client presentations.",
    img: "/AllProjects/Solvent Extraction Plant Layout.jpg",
  },
  {
    id: 4,
    title: "Portable Lifter — Loading & Unloading",
    category: "3D Modeling of Products",
    description:
      "Hydraulic portable lifter SPM designed for heavy-load maneuvering in confined industrial environments.",
    img: "/AllProjects/Portable Lifter for Loading and Unloading.jpg",
  },
  {
    id: 5,
    title: "Submerged Hydraulic Power Pack",
    category: "3D Modeling of Products",
    description:
      "Sealed, pressure-rated hydraulic power pack engineered for submarine subsea operational requirements.",
    img: "/AllProjects/Submerged Hydraulic Power Pack for Sub-marine.jpg",
  },
  {
    id: 6,
    title: "Pneumatic Press — Shredder Attachment",
    category: "3D Modeling of Products",
    description:
      "Custom pneumatic press attachment for industrial shredder machines with force-amplified mechanical actuation.",
    img: "/AllProjects/Pneumatic Press Attachment for Shredder machine.png",
  },

  {
    id: 101,
    title: "1200 & 2400 CC GG Hardware",
    category: "Aerospace and Defence Components",
    description: "High-precision 1200 & 2400 CC GG Hardware developed for mission-critical defense applications.",
    img: "/AllProjects/DRDOProducts/1200 & 2400 cc gg hardware.png",
  },
  {
    id: 102,
    title: "400 ms Delay Body Components",
    category: "Aerospace and Defence Components",
    description: "Advanced 400 ms Deplay Body Components engineered for reliable and precise performance.",
    img: "/AllProjects/DRDOProducts/400 ms deplay body components.png",
  },
  {
    id: 103,
    title: "CDS Ring Assembly",
    category: "Aerospace and Defence Components",
    description: "High-precision CDS Ring Assembly developed for mission-critical defense applications.",
    img: "/AllProjects/DRDOProducts/CDS ring assembly.jpg",
  },
  {
    id: 104,
    title: "Fin Lock Assembly",
    category: "Aerospace and Defence Components",
    description: "High-precision Fin Lock Assembly developed for mission-critical defense applications.",
    img: "/AllProjects/DRDOProducts/Fin lock assembly.png",
  },
  {
    id: 105,
    title: "Metallic Formats",
    category: "Aerospace and Defence Components",
    description: "High-precision Metallic Formats developed for mission-critical defense applications.",
    img: "/AllProjects/DRDOProducts/Metallic formats.jpg",
  },
  {
    id: 106,
    title: "Sector Plates",
    category: "Aerospace and Defence Components",
    description: "High-precision Sector Plates developed for mission-critical defense applications.",
    img: "/AllProjects/DRDOProducts/Sector plates.png",
  },
  {
    id: 107,
    title: "Wooden Formats",
    category: "Aerospace and Defence Components",
    description: "High-precision Wooden Formats developed for mission-critical defense applications.",
    img: "/AllProjects/DRDOProducts/Wooden Formats.png",
  },
  {
    id: 108,
    title: "CDS Rings Assembly",
    category: "Aerospace and Defence Components",
    description: "High-precision CDS Rings Assembly developed for mission-critical defense applications.",
    img: "/AllProjects/DRDOProducts/CDS Ring Assembly2.jpg",
  },
  {
    id: 109,
    title: "HESD Pyro Catridge Components",
    category: "Aerospace and Defence Components",
    description: "High-precision HESD Pyro Catridge Components developed for mission-critical defense applications.",
    img: "/AllProjects/DRDOProducts/hesd pyro catridge components.png",
  },
  {
    id: 110,
    title: "M12 Pyro Bolt Assembly",
    category: "Aerospace and Defence Components",
    description: "High-precision M12 Pyro Bolt Assembly developed for mission-critical defense applications.",
    img: "/AllProjects/DRDOProducts/m12 pyro bolt assembly.png",
  },
  {
    id: 111,
    title: "Mini RCS Sections Assembly",
    category: "Aerospace and Defence Components",
    description: "High-precision Mini RCS Sections Assembly developed for mission-critical defense applications.",
    img: "/AllProjects/DRDOProducts/mini rcs sections assembly.png",
  },
  {
    id: 112,
    title: "Pyro Bolt Pusher Assembly",
    category: "Aerospace and Defence Components",
    description: "High-precision Pyro Bolt Pusher Assembly developed for mission-critical defense applications.",
    img: "/AllProjects/DRDOProducts/pyro bolt pusher assembly.png",
  },
  {
    id: 113,
    title: "RCS Sections Assembly",
    category: "Aerospace and Defence Components",
    description: "High-precision RCS Sections Assembly developed for mission-critical defense applications.",
    img: "/AllProjects/DRDOProducts/rcs sections assembly.png",
  },
  {
    id: 201,
    title: "Pneumatic Telescopic Mast (Type 1)",
    category: "Telescopic Mast",
    description: "High-performance Pneumatic Telescopic Mast (Type 1) engineered for various applications.",
    img: "/AllProjects/Telescopic Mast/Pneumatic Telescopic Mast (Type 1).png",
    specs: { erectedHeight: "6m", retractedHeight: "1.8m", headLoad: "50 Kg", totalWeight: "100 Kg" }
  },
  {
    id: 202,
    title: "Pneumatic Telescopic Mast (Type 2)",
    category: "Telescopic Mast",
    description: "High-performance Pneumatic Telescopic Mast (Type 2) engineered for various applications.",
    img: "/AllProjects/Telescopic Mast/Pneumatic Telescopic Mast (Type 2).png",
    specs: { erectedHeight: "15.8m", retractedHeight: "3.6m", headLoad: "25 Kg", totalWeight: "175 Kg" }
  },
  {
    id: 203,
    title: "Pneumatic Telescopic Mast (Type 3)",
    category: "Telescopic Mast",
    description: "High-performance Pneumatic Telescopic Mast (Type 3) engineered for various applications.",
    img: "/AllProjects/Telescopic Mast/Pneumatic Telescopic Mast (Type 3).png",
    specs: { erectedHeight: "4.2m", retractedHeight: "1.9m", headLoad: "10 Kg", totalWeight: "25 Kg" }
  },
  {
    id: 204,
    title: "Pneumatic Telescopic Mast (Type 4)",
    category: "Telescopic Mast",
    description: "High-performance Pneumatic Telescopic Mast (Type 4) engineered for various applications.",
    img: "/AllProjects/Telescopic Mast/Pneumatic Telescopic Mast (Type 4).png",
    specs: { erectedHeight: "11m", retractedHeight: "1.8m", headLoad: "10 Kg", totalWeight: "50 Kg" }
  },
  {
    id: 205,
    title: "Internal Hydraulic Telescopic Mast",
    category: "Telescopic Mast",
    description: "High-performance Internal Hydraulic Telescopic Mast engineered for various applications.",
    img: "/AllProjects/Telescopic Mast/Internal Hydraulic Telescopic Mast 1.png",
    specs: { erectedHeight: "5m", retractedHeight: "1.9m", headLoad: "500 Kg", totalWeight: "120 Kg" }
  },
  {
    id: 206,
    title: "Rope Drive Mast (Type 1)",
    category: "Telescopic Mast",
    description: "Electromechanical Rope Drive Mast (Type 1) engineered for high load and durability.",
    img: "/AllProjects/Telescopic Mast/Electromechanical Mast (Rope Drive Mast).png",
    specs: { erectedHeight: "2.5m", retractedHeight: "1.5m", headLoad: "250 Kg", totalWeight: "200 Kg" }
  },
  {
    id: 207,
    title: "Rope Drive Mast (Type 2)",
    category: "Telescopic Mast",
    description: "Electromechanical Rope Drive Mast (Type 2) engineered for high load and durability.",
    img: "/AllProjects/Telescopic Mast/Electromechanical Mast (Rope Drive Mast)2.png",
    specs: { erectedHeight: "15m", retractedHeight: "3.5m", headLoad: "150 Kg", totalWeight: "300 Kg" }
  },
  {
    id: 208,
    title: "Rope Drive Mast (Type 3)",
    category: "Telescopic Mast",
    description: "Electromechanical Rope Drive Mast (Type 3) engineered for high load and durability.",
    img: "/AllProjects/Telescopic Mast/Electromechanical Mast (Rope Drive Mast) 3.png",
    specs: { erectedHeight: "15m", retractedHeight: "3.2m", headLoad: "30 Kg", totalWeight: "220 Kg" }
  },
  {
    id: 209,
    title: "Rope Drive Mast (Type 4)",
    category: "Telescopic Mast",
    description: "Electromechanical Rope Drive Mast (Type 4) engineered for high load and durability.",
    img: "/AllProjects/Telescopic Mast/Electromechanical Mast (Rope Drive Mast)  4.png",
    specs: { erectedHeight: "4.5m", retractedHeight: "2.5m", headLoad: "30 Kg", totalWeight: "50 Kg" }
  },
  {
    id: 210,
    title: "Screw Drive Mast (Type 1)",
    category: "Telescopic Mast",
    description: "Electromechanical Screw Drive Mast (Type 1) for precise height control.",
    img: "/AllProjects/Telescopic Mast/Electromechanical Mast (Screw Drive Mast) 1.png",
    specs: { erectedHeight: "10.3m", retractedHeight: "3.1m", headLoad: "200 Kg", totalWeight: "800 Kg" }
  },
  {
    id: 211,
    title: "Screw Drive Mast (Type 2)",
    category: "Telescopic Mast",
    description: "Electromechanical Screw Drive Mast (Type 2) for precise height control.",
    img: "/AllProjects/Telescopic Mast/Electromechanical Mast (Screw Drive Mast) 2.png",
    specs: { erectedHeight: "3m", retractedHeight: "1.8m", headLoad: "10 Kg", totalWeight: "25 Kg" }
  },
  {
    id: 212,
    title: "Screw Drive Mast (Type 3)",
    category: "Telescopic Mast",
    description: "Electromechanical Screw Drive Mast (Type 3) for precise height control.",
    img: "/AllProjects/Telescopic Mast/Screw Drive Mast (Type 3).png",
    specs: { erectedHeight: "7m", retractedHeight: "2m", headLoad: "30 Kg", totalWeight: "70 Kg" }
  },
  {
    id: 213,
    title: "Screw Drive Mast (Type 4)",
    category: "Telescopic Mast",
    description: "Electromechanical Screw Drive Mast (Type 4) for precise height control.",
    img: "/AllProjects/Telescopic Mast/Screw Drive Mast (Type 4).png",
    specs: { erectedHeight: "1.8m", retractedHeight: "0.7m", headLoad: "500 Kg", totalWeight: "350 Kg" }
  },
  {
    id: 214,
    title: "Pull Up Mast (6m)",
    category: "Telescopic Mast",
    description: "Pull Up Mast (6m) designed for quick deployment.",
    img: "/AllProjects/Telescopic Mast/Pull Up mast -6m.png",
    specs: { erectedHeight: "6m", retractedHeight: "1.8m", headLoad: "10 Kg", totalWeight: "20 Kg" }
  },
  {
    id: 215,
    title: "Tripod Telescopic Mast",
    category: "Telescopic Mast",
    description: "Robust Tripod Telescopic Mast for various field applications.",
    img: "/AllProjects/Telescopic Mast/Tripod Telescopic Mast.png"
  },
  {
    id: 216,
    title: "Fiber Reinforced Mast (FRP)",
    category: "Telescopic Mast",
    description: "Lightweight and strong Fiber Reinforced Mast (FRP).",
    img: "/AllProjects/Telescopic Mast/Fiber Reinforced Mast(FRP).png"
  },
  {
    id: 217,
    title: "Vehicle Mounted Telescopic Mast + Azimuth Rotator",
    category: "Telescopic Mast",
    description: "Vehicle Mounted Telescopic Mast integrated with Azimuth Rotator.",
    img: "/AllProjects/Telescopic Mast/Vehicle Mounted Telescopic Mast.png",
    gallery: [
      "/AllProjects/Telescopic Mast/Vehicle Mounted Telescopic Mast.png",
      "/AllProjects/Telescopic Mast/Azimuth Rotator.png"
    ]
  },
  {
    id: 218,
    title: "Inverted Telescopic Mast (6m)",
    category: "Telescopic Mast",
    description: "Inverted Telescopic Mast (6m) for specialized installations.",
    img: "/AllProjects/Telescopic Mast/Inverted Telescopic Mast – 6m.jpg",
    specs: { erectedHeight: "6m", retractedHeight: "1.8m", headLoad: "30 Kg", totalWeight: "210 Kg" }
  },
{
  id: 301,
  title: "Melt Densification Unit",
  category: "Industrial Hydraulics & SPM",
  description: "Special Purpose Machine developed for Nuclear Fuel Complex (NFC) used in material densification processes.",
  img: "/AllProjects/Industrial Hydraulics & SPM Division/melt densification unit1.png",
  gallery: [
    "/AllProjects/Industrial Hydraulics & SPM Division/melt densification unit1.png",
    "/AllProjects/Industrial Hydraulics & SPM Division/melt densification unit2.png",
    "/AllProjects/Industrial Hydraulics & SPM Division/Melt densification unit3.png",
    "/AllProjects/Industrial Hydraulics & SPM Division/Melt densification unit4.png"
  ]
},
  {
    id: 302,
    title: "Mild Steel Shielded Pallet (Radiation Testing Chamber)",
    category: "Industrial Hydraulics & SPM",
    description: "Designed for radiation testing environments at NFC, providing shielding and safe handling of materials.",
    img: "/AllProjects/Industrial Hydraulics & SPM Division/Mild steel shielded pallet.png"
  },
  {
    id: 303,
    title: "PLC Operated Article Loading and Unloading System",
    category: "Industrial Hydraulics & SPM",
    description: "Automated system developed for NSTL to handle loading and unloading operations with PLC control.",
    img: "/AllProjects/Industrial Hydraulics & SPM Division/PLC OPERATED ARTICLE LOADING AND UNLOADING SYSTEM.png"
  },
  {
    id: 304,
    title: "Heavy Duty Scissor Lift (10 Mt Height, 1 Ton Payload)",
    category: "Industrial Hydraulics & SPM",
    description: "Hydraulic lifting system designed for heavy industrial applications with high load capacity.",
    img: "/AllProjects/Industrial Hydraulics & SPM Division/ea-heavy-duty-scissor-lift.png"
  },
  {
    id: 305,
    title: "Motorized Hydraulic Scissor Lift (500 kg Payload)",
    category: "Industrial Hydraulics & SPM",
    description: "Compact motorized lifting solution for medium-duty industrial operations.",
    img: "/AllProjects/Industrial Hydraulics & SPM Division/EA-Heavy Duty Scissor Lifts & Hydraulics & Power packs2 (500 kg Payload).png"
  },
  {
    id: 306,
    title: "Hydraulic Scissor Lift",
    category: "Industrial Hydraulics & SPM",
    description: "Material handling system supplied to Nuclear Fuel Complex for lifting applications.",
    img: "/AllProjects/Industrial Hydraulics & SPM Division/Heavy Duty Scissor Lifts & Hydraulics & Power packs3.jpg"
  },
  {
    id: 307,
    title: "PLC Operated R-F Test Setup",
    category: "Industrial Hydraulics & SPM",
    description: "Testing setup designed for RF applications, used by Indian Navy (Naval Dockyard).",
    img: "/AllProjects/Industrial Hydraulics & SPM Division/PLC OPERATED R-F TEST SETUP.png",
    gallery: [
      "/AllProjects/Industrial Hydraulics & SPM Division/PLC OPERATED R-F TEST SETUP.png",
      "/AllProjects/Industrial Hydraulics & SPM Division/PLC OPERATED R-F TEST SETUP 2.png"
    ]
  },
  {
    id: 308,
    title: "Beam Deployment Unit",
    category: "Industrial Hydraulics & SPM",
    description: "Specialized deployment system developed for BDL Hyderabad.",
    img: "/AllProjects/Industrial Hydraulics & SPM Division/Beam Deployment Unit1.png",
    gallery: [
      "/AllProjects/Industrial Hydraulics & SPM Division/Beam Deployment Unit1.png",
      "/AllProjects/Industrial Hydraulics & SPM Division/Beam Deployment Unit2.png"
    ]
  },
  {
    id: 309,
    title: "Rubber Moulding Press / Bailing Press",
    category: "Industrial Hydraulics & SPM",
    description: "Industrial press system used for molding and compression applications.",
    img: "/AllProjects/Industrial Hydraulics & SPM Division/Rubber moulding press.png",
    gallery: [
      "/AllProjects/Industrial Hydraulics & SPM Division/Rubber moulding press.png",
      "/AllProjects/Industrial Hydraulics & SPM Division/bailing press.png"
    ]
  },
  {
    id: 310,
    title: "30 Ton Hydraulic Press",
    category: "Industrial Hydraulics & SPM",
    description: "High-capacity hydraulic press for heavy-duty industrial operations.",
    img: "/AllProjects/Industrial Hydraulics & SPM Division/30 Ton Hydraulic Press.png"
  },
  {
    id: 311,
    title: "Hydraulic Power Pack",
    category: "Industrial Hydraulics & SPM",
    description: "Power unit used to drive hydraulic systems efficiently.",
    img: "/AllProjects/Industrial Hydraulics & SPM Division/Hydraulic Power Pack.jpg"
  },
  {
    id: 312,
    title: "100 Ton Hydraulic Cylinders",
    category: "Industrial Hydraulics & SPM",
    description: "Heavy-duty cylinders used in industrial and defense applications.",
    img: "/AllProjects/Industrial Hydraulics & SPM Division/100 Ton Hydraulic Cylinders.png"
  },
  {
    id: 313,
    title: "Hydraulic Filter Press",
    category: "Industrial Hydraulics & SPM",
    description: "Used for filtration processes in industrial environments.",
    img: "/AllProjects/Industrial Hydraulics & SPM Division/hydraulic-filter-press.png"

  },
  {
    id: 314,
    title: "Hydraulic Cylinders – Steel Plant",
    category: "Industrial Hydraulics & SPM",
    description: "Specialized cylinders designed for steel plant operations.",
    img: "/AllProjects/Industrial Hydraulics & SPM Division/Hydraulic Cylinders-Steel Plant.png"
  },
  {
    id: 315,
    title: "Heavy Duty Tie Rod Hydraulic Cylinder",
    category: "Industrial Hydraulics & SPM",
    description: "Robust cylinder design for high-pressure applications.",
    img: "/AllProjects/Industrial Hydraulics & SPM Division/Heavy Duty Tie Rod Hydraulic Cylinder.png"
  },
  {
    id: 316,
    title: "Furnace Boom Hydraulic Cylinder",
    category: "Industrial Hydraulics & SPM",
    description: "Used in furnace operations for controlled movement and lifting.",
    img: "/AllProjects/Industrial Hydraulics & SPM Division/Furnace Boom Hydraulic Cylinder.png"
  }
];
