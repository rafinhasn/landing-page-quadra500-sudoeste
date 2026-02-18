import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { toast } from 'sonner';
import { 
  Users, 
  Download, 
  LogOut, 
  Search, 
  Trash2,
  TrendingUp,
  Home,
  Phone,
  Mail,
  Calendar
} from 'lucide-react';

const Admin = () => {
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState({ total: 0, por_quartos: {} });
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    // Verificar autenticação
    const isAuth = localStorage.getItem('adminAuth');
    if (!isAuth) {
      navigate('/admin/login');
      return;
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Buscar leads
      const leadsResponse = await fetch(`${BACKEND_URL}/api/leads`);
      const leadsData = await leadsResponse.json();
      setLeads(leadsData);

      // Buscar estatísticas
      const statsResponse = await fetch(`${BACKEND_URL}/api/leads/stats`);
      const statsData = await statsResponse.json();
      setStats(statsData);

      toast.success('Dados atualizados!');
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      toast.error('Erro ao carregar dados');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    toast.success('Logout realizado');
    navigate('/admin/login');
  };

  const handleDelete = async (leadId) => {
    if (!window.confirm('Tem certeza que deseja deletar este lead?')) return;

    try {
      const response = await fetch(`${BACKEND_URL}/api/leads/${leadId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Lead deletado com sucesso');
        fetchData();
      } else {
        toast.error('Erro ao deletar lead');
      }
    } catch (error) {
      console.error('Erro ao deletar:', error);
      toast.error('Erro ao deletar lead');
    }
  };

  const exportToCSV = () => {
    const headers = ['Nome', 'Email', 'Celular', 'Quartos', 'Data Cadastro'];
    const csvData = leads.map(lead => [
      lead.nome,
      lead.email,
      lead.celular,
      `${lead.quartos} quartos`,
      new Date(lead.created_at).toLocaleString('pt-BR')
    ]);

    const csv = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `leads_quadra500_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success('Arquivo CSV exportado!');
  };

  const filteredLeads = leads.filter(lead =>
    lead.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.celular.includes(searchTerm)
  );

  const quartosBadgeColor = {
    '2': 'bg-purple-100 text-purple-800 border-purple-300',
    '3': 'bg-blue-100 text-blue-800 border-blue-300',
    '4': 'bg-red-100 text-red-800 border-red-300',
    '5': 'bg-amber-100 text-amber-800 border-amber-300'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-amber-600 p-2 rounded-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Painel Administrativo</h1>
                <p className="text-sm text-gray-600">Quadra 500 Sudoeste</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => navigate('/')}
                className="gap-2"
              >
                <Home className="w-4 h-4" />
                Site
              </Button>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total de Leads</CardDescription>
              <CardTitle className="text-4xl">{stats.total}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-green-600">
                <TrendingUp className="w-4 h-4" />
                <span>Cadastros ativos</span>
              </div>
            </CardContent>
          </Card>

          {Object.entries(stats.por_quartos).map(([quartos, count]) => (
            <Card key={quartos}>
              <CardHeader className="pb-3">
                <CardDescription>{quartos} Quartos</CardDescription>
                <CardTitle className="text-4xl">{count}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-600">
                  {((count / stats.total) * 100).toFixed(1)}% do total
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Actions Bar */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 w-full md:max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Buscar por nome, email ou telefone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                <Button
                  onClick={fetchData}
                  variant="outline"
                  disabled={isLoading}
                  className="flex-1 md:flex-initial"
                >
                  {isLoading ? 'Carregando...' : 'Atualizar'}
                </Button>
                <Button
                  onClick={exportToCSV}
                  className="bg-green-600 hover:bg-green-700 gap-2 flex-1 md:flex-initial"
                >
                  <Download className="w-4 h-4" />
                  Exportar CSV
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Leads Table */}
        <Card>
          <CardHeader>
            <CardTitle>Leads Cadastrados ({filteredLeads.length})</CardTitle>
            <CardDescription>
              Lista completa de todos os interessados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Contato</TableHead>
                    <TableHead>Interesse</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeads.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                        {searchTerm ? 'Nenhum lead encontrado' : 'Nenhum lead cadastrado ainda'}
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredLeads.map((lead) => (
                      <TableRow key={lead._id}>
                        <TableCell className="font-medium">{lead.nome}</TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm">
                              <Mail className="w-4 h-4 text-gray-400" />
                              <a href={`mailto:${lead.email}`} className="text-blue-600 hover:underline">
                                {lead.email}
                              </a>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Phone className="w-4 h-4 text-gray-400" />
                              <a href={`https://wa.me/55${lead.celular}`} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">
                                {lead.celular}
                              </a>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={quartosBadgeColor[lead.quartos] || 'bg-gray-100'}>
                            {lead.quartos} quartos
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="w-4 h-4" />
                            {new Date(lead.created_at).toLocaleDateString('pt-BR')}
                            <span className="text-gray-400">
                              {new Date(lead.created_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(lead._id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
