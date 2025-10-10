import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Upload, Image as ImageIcon, Calendar, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ImageData {
  name: string;
  date: string;
  base64?: string;
}

const Clientes = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [images, setImages] = useState<ImageData[]>([]);
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  // Placeholder API endpoint - replace with your actual EC2 API
  const API_BASE_URL = "https://your-ec2-instance.com/api";

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Erro",
          description: "Por favor, selecione um arquivo de imagem válido.",
          variant: "destructive",
        });
        return;
      }
      setSelectedFile(file);
      console.log("Arquivo selecionado:", file.name);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast({
        title: "Erro",
        description: "Por favor, selecione uma imagem primeiro.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    console.log("Iniciando upload da imagem:", selectedFile.name);

    try {
      // Step 1: Request presigned URL from your EC2 API
      console.log("Solicitando URL pré-assinada...");
      const presignedResponse = await fetch(`${API_BASE_URL}/presigned-url`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileName: selectedFile.name,
          fileType: selectedFile.type,
        }),
      });

      if (!presignedResponse.ok) {
        throw new Error("Erro ao obter URL pré-assinada");
      }

      const { url } = await presignedResponse.json();
      console.log("URL pré-assinada obtida com sucesso");

      // Step 2: Upload file to S3 using presigned URL
      console.log("Fazendo upload para S3...");
      const uploadResponse = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": selectedFile.type,
        },
        body: selectedFile,
      });

      if (!uploadResponse.ok) {
        throw new Error("Erro ao fazer upload da imagem");
      }

      console.log("Upload realizado com sucesso");

      toast({
        title: "Sucesso!",
        description: "Imagem enviada com sucesso.",
      });

      // Refresh images list
      await fetchImages();

      setSelectedFile(null);
      // Reset file input
      const fileInput = document.getElementById("file-input") as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    } catch (error) {
      console.error("Erro no upload:", error);
      toast({
        title: "Erro",
        description: "Não foi possível enviar a imagem. Verifique sua conexão e tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const fetchImages = async () => {
    try {
      console.log("Buscando lista de imagens...");
      const response = await fetch(`${API_BASE_URL}/images`);

      if (!response.ok) {
        throw new Error("Erro ao buscar imagens");
      }

      const data = await response.json();
      console.log("Imagens obtidas:", data);
      setImages(data.images || []);
    } catch (error) {
      console.error("Erro ao buscar imagens:", error);
      toast({
        title: "Aviso",
        description: "Não foi possível carregar a lista de imagens.",
        variant: "destructive",
      });
    }
  };

  const handleImageClick = async (image: ImageData) => {
    try {
      console.log("Buscando Base64 para:", image.name);
      const response = await fetch(`${API_BASE_URL}/images/${image.name}`);

      if (!response.ok) {
        throw new Error("Erro ao buscar Base64");
      }

      const data = await response.json();
      console.log("Base64 obtido com sucesso");
      setSelectedImage({
        ...image,
        base64: data.base64,
      });
    } catch (error) {
      console.error("Erro ao buscar Base64:", error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar a imagem.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen py-20 gradient-soft">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            Área de <span className="text-gradient">Clientes</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Faça upload e converta suas imagens para Base64
          </p>
        </div>

        {/* Upload Section */}
        <Card className="max-w-2xl mx-auto mb-12 border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5 text-accent" />
              Enviar Nova Imagem
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Input
                id="file-input"
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="cursor-pointer"
              />
              {selectedFile && (
                <p className="text-sm text-muted-foreground mt-2">
                  Arquivo selecionado: <span className="font-semibold">{selectedFile.name}</span>
                </p>
              )}
            </div>

            <Button
              onClick={handleUpload}
              disabled={!selectedFile || isUploading}
              className="w-full"
              variant="gradient"
            >
              {isUploading ? "Enviando..." : "Enviar Imagem"}
            </Button>

            <div className="flex items-start gap-2 p-4 bg-muted/50 rounded-lg">
              <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                <strong>Nota:</strong> Esta é uma demonstração. Configure o endpoint da API EC2 
                no arquivo <code className="bg-background px-1 rounded">Clientes.tsx</code> 
                (variável <code className="bg-background px-1 rounded">API_BASE_URL</code>) 
                para conectar com seu backend real.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Images List */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Imagens <span className="text-gradient">Enviadas</span>
          </h2>

          {images.length === 0 ? (
            <Card className="border-border">
              <CardContent className="py-12 text-center">
                <ImageIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">
                  Nenhuma imagem enviada ainda. Faça o upload da sua primeira imagem acima!
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.map((image, index) => (
                <Card
                  key={index}
                  className="cursor-pointer hover-lift border-border"
                  onClick={() => handleImageClick(image)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <ImageIcon className="w-6 h-6 text-accent" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold truncate mb-1">{image.name}</h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {image.date}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Base64 Preview */}
        {selectedImage && selectedImage.base64 && (
          <div className="max-w-4xl mx-auto mt-12">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Preview: {selectedImage.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <img
                    src={`data:image/png;base64,${selectedImage.base64}`}
                    alt={selectedImage.name}
                    className="max-w-full h-auto mx-auto rounded-lg shadow-lg"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold mb-2 block">
                    String Base64:
                  </label>
                  <div className="bg-primary/5 p-4 rounded-lg border border-border">
                    <code className="text-xs break-all block max-h-32 overflow-y-auto">
                      {selectedImage.base64}
                    </code>
                  </div>
                </div>

                <Button
                  onClick={() => {
                    navigator.clipboard.writeText(selectedImage.base64 || "");
                    toast({
                      title: "Copiado!",
                      description: "Base64 copiado para a área de transferência.",
                    });
                  }}
                  variant="outline"
                  className="w-full"
                >
                  Copiar Base64
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Clientes;
