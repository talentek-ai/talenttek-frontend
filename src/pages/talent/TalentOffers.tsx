import React, { useState } from "react";
import TalentLayout from "@/components/layouts/TalentLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, XCircle, Clock, DollarSign, Calendar, MapPin, Briefcase } from "lucide-react";

interface Offer {
  id: number;
  company: string;
  companyLogo: string;
  jobTitle: string;
  salary: string;
  salaryRange: {
    min: number;
    max: number;
    currency: string;
  };
  location: string;
  jobType: string;
  startDate: string;
  benefits: string[];
  status: "pending" | "accepted" | "rejected";
  offerDate: string;
  expiryDate: string;
}

const TalentOffers = () => {
  const { toast } = useToast();
  const [offers, setOffers] = useState<Offer[]>([
    {
      id: 1,
      company: "Hi Talents",
      companyLogo: "HT",
      jobTitle: "Content & Social Media Manager",
      salary: "$3,500 - $4,500/month",
      salaryRange: {
        min: 3500,
        max: 4500,
        currency: "USD",
      },
      location: "Remote",
      jobType: "Full-time",
      startDate: "01/12/2025",
      benefits: [
        "Health Insurance",
        "Flexible Working Hours",
        "Professional Development",
        "Remote Work",
        "Performance Bonus",
      ],
      status: "pending",
      offerDate: "17/11/2025",
      expiryDate: "24/11/2025",
    },
    {
      id: 2,
      company: "Tech Innovations Inc",
      companyLogo: "TI",
      jobTitle: "Senior React Developer",
      salary: "$5,000 - $6,500/month",
      salaryRange: {
        min: 5000,
        max: 6500,
        currency: "USD",
      },
      location: "Hybrid",
      jobType: "Full-time",
      startDate: "15/12/2025",
      benefits: [
        "Health Insurance",
        "Stock Options",
        "Gym Membership",
        "Learning Budget",
        "Home Office Setup",
      ],
      status: "accepted",
      offerDate: "15/11/2025",
      expiryDate: "22/11/2025",
    },
    {
      id: 3,
      company: "Creative Agency Pro",
      companyLogo: "CA",
      jobTitle: "UI/UX Designer",
      salary: "$2,800 - $3,800/month",
      salaryRange: {
        min: 2800,
        max: 3800,
        currency: "USD",
      },
      location: "On-site",
      jobType: "Full-time",
      startDate: "01/01/2026",
      benefits: [
        "Health Insurance",
        "Creative Workspace",
        "Team Outings",
        "Professional Tools",
      ],
      status: "rejected",
      offerDate: "10/11/2025",
      expiryDate: "17/11/2025",
    },
  ]);

  const handleAcceptOffer = (id: number) => {
    setOffers((prevOffers) =>
      prevOffers.map((offer) =>
        offer.id === id ? { ...offer, status: "accepted" } : offer
      )
    );
    toast({
      title: "Offer Accepted!",
      description: "You have successfully accepted the job offer.",
    });
  };

  const handleRejectOffer = (id: number) => {
    setOffers((prevOffers) =>
      prevOffers.map((offer) =>
        offer.id === id ? { ...offer, status: "rejected" } : offer
      )
    );
    toast({
      title: "Offer Rejected",
      description: "You have Rejected the job offer.",
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case "accepted":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "rejected":
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "accepted":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return "Pending";
      case "accepted":
        return "Accepted";
      case "rejected":
        return "Rejected";
      default:
        return status;
    }
  };

  const pendingOffers = offers.filter((o) => o.status === "pending");
  const acceptedOffers = offers.filter((o) => o.status === "accepted");
  const rejectedOffers = offers.filter((o) => o.status === "rejected");

  const OfferCard = ({ offer }: { offer: Offer }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="pt-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-white font-semibold">
                {offer.companyLogo}
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white text-lg">
                  {offer.jobTitle}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {offer.company}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {getStatusIcon(offer.status)}
              <Badge className={getStatusColor(offer.status)}>
                {getStatusLabel(offer.status)}
              </Badge>
            </div>
          </div>

          {/* Salary */}
          <div className="bg-primary/5 dark:bg-primary/10 rounded-lg p-4 border border-primary/10">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-primary" />
              <span className="font-semibold text-primary text-lg">
                {offer.salary}
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Annual salary range
            </p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-slate-500" />
              <span className="text-slate-700 dark:text-slate-300">{offer.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Briefcase className="w-4 h-4 text-slate-500" />
              <span className="text-slate-700 dark:text-slate-300">{offer.jobType}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-slate-500" />
              <span className="text-slate-700 dark:text-slate-300">
                Start: {offer.startDate}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-slate-500" />
              <span className="text-slate-700 dark:text-slate-300">
                Expires: {offer.expiryDate}
              </span>
            </div>
          </div>

          {/* Benefits */}
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white mb-2">
              Benefits
            </p>
            <div className="flex flex-wrap gap-2">
              {offer.benefits.map((benefit, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">
                  {benefit}
                </Badge>
              ))}
            </div>
          </div>

          {/* Actions */}
          {offer.status === "pending" && (
            <div className="flex gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
              <Button
                onClick={() => handleRejectOffer(offer.id)}
                variant="outline"
                className="flex-1 gap-2"
              >
                <XCircle className="w-4 h-4" />
                Reject Offer
              </Button>
              <Button
                onClick={() => handleAcceptOffer(offer.id)}
                className="flex-1 gap-2 bg-gradient-primary hover:opacity-90"
              >
                <CheckCircle className="w-4 h-4" />
                Accept Offer
              </Button>
            </div>
          )}

          {offer.status === "accepted" && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 text-sm text-green-800 dark:text-green-200">
              ✓ You have accepted this offer. The employer will contact you soon.
            </div>
          )}

          {offer.status === "rejected" && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 text-sm text-red-800 dark:text-red-200">
              ✗ You have Rejected this offer.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <TalentLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Job Offers
          </h1>
          <p className="text-muted-foreground">Review and respond to job offers</p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pending" className="gap-2">
              <Clock className="w-4 h-4" />
              Pending ({pendingOffers.length})
            </TabsTrigger>
            <TabsTrigger value="accepted" className="gap-2">
              <CheckCircle className="w-4 h-4" />
              Accepted ({acceptedOffers.length})
            </TabsTrigger>
            <TabsTrigger value="rejected" className="gap-2">
              <XCircle className="w-4 h-4" />
              Rejected ({rejectedOffers.length})
            </TabsTrigger>
          </TabsList>

          {/* Pending Offers */}
          <TabsContent value="pending" className="space-y-4">
            {pendingOffers.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {pendingOffers.map((offer) => (
                  <OfferCard key={offer.id} offer={offer} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="pt-12 pb-12 text-center">
                  <p className="text-slate-500 dark:text-slate-400">
                    No pending offers at the moment
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Accepted Offers */}
          <TabsContent value="accepted" className="space-y-4">
            {acceptedOffers.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {acceptedOffers.map((offer) => (
                  <OfferCard key={offer.id} offer={offer} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="pt-12 pb-12 text-center">
                  <p className="text-slate-500 dark:text-slate-400">
                    You haven't accepted any offers yet
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Rejected Offers */}
          <TabsContent value="rejected" className="space-y-4">
            {rejectedOffers.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {rejectedOffers.map((offer) => (
                  <OfferCard key={offer.id} offer={offer} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="pt-12 pb-12 text-center">
                  <p className="text-slate-500 dark:text-slate-400">
                    No rejected offers
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </TalentLayout>
  );
};

export default TalentOffers;
