import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Graph from "./Graph";
import HealthGraphData from "./data/health_domain_graph.json";
import ViolenceGraphData from "./data/violence_domain_graph.json";
import FormulaKeyness from "../img/formula_keyness.png";
import FormulaUnderreporting from "../img/formula_underreporting.png";
import "./TechnicalNote.css";

function TechnicalNote() {
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const id = location.hash.replace("#", "");
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 0);
    }
  }, [location]);

  return (
    <section className="tech-note">
      <div className="content">
        <h1>Nota técnica</h1>
        <span className="author">
          Por{" "}
          <a
            href="https://www.vitalstrategies.org/sao-paulo-brasil/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vital Strategies Brasil
          </a>{" "}
          &{" "}
          <a
            href="https://www2.ufjf.br/framenetbr/"
            target="_blank"
            rel="noopener noreferrer"
          >
            FrameNet Brasil
          </a>
        </span>
        <p dir="ltr">
          Este painel apresenta dados sobre a subnotificação de violências e
          padrões semânticos relacionados à violência de gênero no Recife. Este
          projeto foi desenvolvido pela Vital Strategies Brasil em parceria com
          a FrameNet Brasil e a Secretaria de Saúde do Recife (SESAU).
        </p>
        <p dir="ltr">
          Neste projeto, utilizamos dados de sistemas de informação de saúde –
          Sistema de Informação de Agravos de Notificação (Sinan), Sistema de
          Informação sobre Mortalidade (SIM), Sistema de Informação sobre
          Hospitalização (SIH) e e-SUS Atenção Primária em Saúde (APS) – com o
          objetivo de gerar análises diagnósticas sobre a violência contra
          meninas e mulheres no município do Recife. O objetivo final é apoiar a
          Secretaria de Saúde do Recife a fortalecer políticas públicas de
          atenção e cuidado a estas mulheres orientadas por evidências.
        </p>
        <h2>Bases de dados utilizadas</h2>
        <p dir="ltr">
          A violência é um fenômeno multifatorial e pode ser rastreada por meio
          de diferentes tipos de dados. No Brasil, diferentes sistemas de
          informação em saúde pública acompanham informações relevantes para a
          compreensão da violência baseada em gênero (VBG): internações (base de
          dados do SIH), notificações de violência (Sinan - Violências),
          notificações de intoxicações (Sinan - Intoxicação Exógena),
          prontuários médicos da atenção primária (base de dados do e-SUS APS) e
          mortalidade (base de dados do SIM).
        </p>
        <p dir="ltr">
          Cada uma dessas bases tem características específicas de acordo com
          seus objetivos. O Sistema de Informações Hospitalares (SIH), por
          exemplo, registra dados sobre internações no sistema público de saúde
          para garantir que os serviços recebam recursos financeiros referentes
          aos procedimentos realizados nos pacientes. Portanto, foi concebido
          como um sistema de pagamento, mas mesmo assim pode fornecer
          informações epidemiológicas relevantes. Já o Sinan e o SIM têm o papel
          de apoiar o governo com informações sobre morbidade e mortalidade,
          coletando dados referentes às pessoas atendidas pelo sistema de saúde.
          Esses dados são coletados de forma rotineira no sistema de saúde e,
          portanto, produzem um retrato importante do que ocorre nos serviços.
        </p>
        <p dir="ltr">
          O Sistema de Informações sobre Mortalidade (SIM) tem a vantagem de
          possuir cobertura quase universal, registrando todos os óbitos no
          país. Ele apoia profissionais e gestores com dados relevantes sobre
          causas de óbito e o perfil geral das vítimas. No Brasil, profissionais
          de saúde têm a obrigação de notificar a autoridade em saúde sempre que
          identificam casos de violência (interpessoal ou autoprovocada) e
          intoxicações. Esses dados são registrados no Sinan, que é a principal
          referência que temos para obter informações e quantificar a violência
          baseada em gênero no país. Quando ligado a outros sistemas, fornece um
          diagnóstico poderoso sobre a violência contra mulheres — mas também
          sobre a qualidade dos dados.
        </p>
        <p dir="ltr">
          No Brasil, profissionais de saúde têm a obrigação de notificar a
          autoridade em saúde sempre que identificam casos de violência
          (interpessoal ou autoprovocada) e intoxicações. Esses dados são
          registrados no Sinan, que é a principal referência que temos para
          obter informações e quantificar a violência baseada em gênero no país.
          Quando ligado a outros sistemas, fornece um diagnóstico poderoso sobre
          a violência contra mulheres — mas também sobre a qualidade dos dados.
        </p>
        <p dir="ltr">
          Recentemente, há um esforço para ampliar a digitalização dos registros
          de saúde por meio do e-SUS APS, um sistema projetado para coletar e
          armazenar dados gerados pelos serviços de atenção primária à saúde.
          Esse sistema está sendo implementado em todo o país e armazena grandes
          volumes de dados, uma vez que registra atendimentos médicos de rotina.
        </p>
        <p dir="ltr">
          Apesar desse grande volume de dados, não há um identificador único que
          permita reconhecer o mesmo indivíduo em diferentes bases de dados. Por
          isso, é preciso empregar técnicas de pareamento de dados para mapear
          as trajetórias dos indivíduos pelo sistema de saúde.
        </p>
        <h2>
          <em>Linkage</em> ou pareamento de dados
        </h2>
        <p dir="ltr">
          A primeira etapa deste trabalho consistiu no linkage – ou pareamento –
          de bancos de dados da saúde. Dados de todos os Sistemas de Informação
          em Saúde (SISs) já mencionados (Sinan Violências e Intoxicação
          Exógenas, SIH, SIM e e-SUS APS) foram pareados entre si.
        </p>
        <p dir="ltr">
          Estes bancos foram conectados com o uso de um método determinístico de{" "}
          <em>linkage</em> capaz de identificar todos os registros de uma mesma
          pessoa entre os diferentes sistemas, permitindo assim traçar a linha
          da vida das mulheres que são atendidas pelo SUS.
        </p>
        <p dir="ltr">
          O algoritmo determinístico utiliza regras baseadas na combinação de
          variáveis-chave e foi desenvolvido com base nos campos disponíveis em
          cada uma das bases de dados analisadas. O primeiro passo foi o
          pré-processamento dos dados para correção e padronização de variáveis
          como nome, nome da mãe, data de nascimento, rua e bairro — todas
          utilizadas nas regras de comparação de registros. Em seguida, novos
          campos com informações textuais (por exemplo, nomes e endereços) foram
          criados para a padronização e comparação. As novas variáveis passaram
          por uma nova transformação, sendo convertidas em código Soundex, que
          transforma palavras em códigos capazes de capturar relações fonéticas
          nas comparações — como o uso de "s" ou "c", ou o uso (ou não) de
          consoantes duplas. Detalhes adicionais sobre a técnica de pareamento
          de dados podem ser encontrados em <a href="#ref1">[1]</a>.
        </p>
        <p dir="ltr">
          Após o linkage, foi executado o processo de anonimização, utilizando
          uma combinação de métodos manuais, automáticos e semiautomáticos. O
          framework emprega uma combinação de modelos de inteligência artificial
          para reconhecimento de entidades nomeadas (NER), expressões regulares
          e busca difusa (<em>fuzzy search</em>) para identificar informações
          pessoais identificáveis. Quando múltiplos métodos concordavam que um
          trecho de texto continha essas informações, esse trecho era
          substituído por uma <em>tag</em> especial de anonimização. Quando não
          havia consenso sobre o trecho, uma ferramenta era utilizada para
          exibir esse fragmento e um técnico avaliava se ele continha ou não
          informações sensíveis. Essa ferramenta facilitou buscas manuais e
          marcação de informações pessoais identificáveis nos casos em que os
          modelos de NER e os algoritmos de busca não tivessem sucesso.{" "}
        </p>
        <p dir="ltr">
          Além do pareamento das bases de dados e anonimização de campos
          textuais, também são realizadas etapas de processamento para
          normalizar certos tipos de informação, como códigos CID-10 e de
          endereços e a associação dos registros a informações sobre suas
          unidades de saúde via códigos CNES.
        </p>
        <h2>Extração de características semânticas</h2>
        <p dir="ltr">
          As complexidades inerentes à linguagem — como ambiguidade e
          variabilidade — são frequentemente a razão pela qual o processamento
          de língua natural (PLN) é desafiador. Embora tecnologias modernas de
          PLN lidem com parte dessas questões, muitas vezes carecem de{" "}
          <strong>interpretabilidade</strong>, o que também levanta preocupações
          éticas. Por outro lado, abordagens mais simples e interpretáveis, como
          o <em>bag-of-words</em>, tendem a perder informações relevantes sobre
          contexto e estrutura. Dada a importância da interpretabilidade para
          gerar insights relevantes neste projeto, optamos por estruturas
          semânticas baseadas na FrameNet em vez de depender exclusivamente de
          dados textuais, pois capturam contexto, senso comum e nuances
          culturais.
        </p>
        <p dir="ltr">
          A FrameNet é uma rede de <em>frames</em>. De acordo com a Semântica de
          Frames <a href="#ref2">[2]</a>, um <em>frame</em> representa uma cena,
          incluindo seus participantes, os objetos envolvidos e como eles
          interagem. Por exemplo, o <em>frame</em> <strong>Infectar</strong>{" "}
          representa uma situação em que há três participantes principais: a{" "}
          <strong>Infecção</strong>, a <strong>Entidade infectada</strong> e a{" "}
          <strong>Causa da infecção</strong>. Outros elementos também podem
          aparecer, como o <strong>Lugar</strong> e o <strong>Tempo</strong>,
          fornecendo mais contexto e informações sobre a cena. Essas cenas estão
          associadas a itens lexicais que as evocam, ou seja, em uma frase, as
          palavras ativam o conhecimento de fundo expresso pelos <em>frames</em>
          . No caso de <strong>Infectar</strong>, isso ocorreria, por exemplo,
          com um substantivo como <strong>infecção</strong>.
        </p>
        <p>
          Dado o foco do projeto na violência baseada em gênero e seu trabalho
          com dados do sistema público de saúde, os <em>frames</em> dos domínios
          de Violência e Saúde precisaram ser modelados antes de poderem ser
          utilizados na extração de informações semânticas.
        </p>
        <h2>Modelagem Semântica dos Domínios de Saúde e Violência</h2>
        <p dir="ltr">
          Na FrameNet, um domínio é representado por um conjunto de cenas
          intimamente relacionadas a esse aspecto da realidade, como os domínios
          da Saúde e da Violência. Essas cenas são representadas por{" "}
          <em>frames</em>, conectados entre si por meio de uma série de relações
          tipadas, formando uma rede de <em>frames</em> (por exemplo,{" "}
          <strong>Infectar</strong> e <strong>Patógenos</strong> estão
          conectados por meio da relação Uso, indicando que a cena de infecção
          pressupõe a existência de patógenos causadores dessa infecção). Esses{" "}
          <em>frames</em> são então evocados por unidades lexicais (Unidades
          Lexicais - ULs), que aparecem como palavras ou expressões em textos
          onde aquele domínio é um tema relevante. Essas ULs podem ainda estar
          relacionadas entre si por meio de relações de <em>qualia</em>{" "}
          <a href="#ref3">[3]</a>. As relações de qualia capturam, por exemplo,
          a relação entre uma especialidade médica e a parte do corpo na qual
          ela se foca (como “oftalmologista” e “olho”). Ao descrever um domínio,
          relatamos o número de <em>frames</em> e como eles se relacionam entre
          si, bem como o número de itens lexicais e suas relações{" "}
          <em>qualia</em>.
        </p>
        <p dir="ltr">
          A modelagem computacional de um domínio específico segundo a Semântica
          de Frames seguiu uma metodologia de nove etapas, conforme descrito por{" "}
          <a href="#ref4">[4]</a>, envolvendo a análise de dados textuais
          relacionados a esse domínio. Essa metodologia foi expandida e adaptada
          para modelar o domínio da Saúde, conforme descrito por{" "}
          <a href="#ref5">[5]</a>, e posteriormente utilizada para modelar o
          domínio da Violência.
        </p>
        <p dir="ltr">
          O domínio da Saúde é composto por um total de 35 <em>frames</em>,
          incluindo 17 novos <em>frames</em> criados especificamente para este
          projeto, e 18 que já existiam na base de dados do FrameNet Brasil. As
          relações entre <em>frames</em> (<em>Frame-to-Frame</em> – F-F),
          definidas entre os <em>frames</em> que modelaram o domínio{" "}
          <a href="#ref6">[6]</a>, estão apresentadas na rede abaixo. Associadas
          a esses frames, foram estabelecidas 2.776 unidades lexicais e 3.424
          relações de <em>qualia</em>.
        </p>
        <div className="graph-wrapper">
          <Graph data={HealthGraphData} />
        </div>
        <p dir="ltr">
          Um processo semelhante foi realizado para a criação do domínio da
          Violência. Neste caso, foi utilizado um número maior de{" "}
          <em>frames</em> já existentes na base de dados do FrameNet Brasil,
          totalizando 43 <em>frames</em>. Além disso, 5 novos <em>frames</em>{" "}
          tiveram que ser criados para atender às necessidades específicas do
          domínio, elevando o total para 48 <em>frames</em>. As relações{" "}
          <em>Frame-to-Frame</em> (F-F) estabelecidas entre os <em>frames</em>{" "}
          que modelaram o domínio estão ilustradas na rede abaixo. Associadas a
          esses <em>frames</em>, foram criadas 1764 unidades lexicais e
          estabelecidas 546 relações de <em>qualia</em> entre elas.
        </p>
        <div className="graph-wrapper">
          <Graph data={ViolenceGraphData} />
        </div>
        <h2 dir="ltr">Anotação de estruturas semânticas em texto</h2>
        <p dir="ltr">
          Com os <em>frames</em> e suas relações definidos, a próxima etapa do
          processo foi realizada: a anotação de exemplos textuais. A anotação,
          neste projeto, consistiu na marcação das ULs significativas com os{" "}
          <em>frames</em>
          que elas evocam e na identificação dos elementos de <em>
            frame
          </em>{" "}
          presentes em cada sentença. Essa anotação foi feita por dois métodos:
          manual e automático.
        </p>
        <p dir="ltr">
          Como a anotação manual é uma tarefa relativamente demorada, ela pôde
          ser realizada apenas em uma amostra dos campos de texto dos sistemas
          públicos de saúde. Essa amostragem buscou representar os diversos
          campos textuais dos sistemas de informação e o uso variado de
          palavras. A anotação teve dois objetivos: (i) validar o modelo para os
          dois domínios e (ii) constituir um conjunto de dados de treinamento
          para um modelo neural de anotação automática, que pode ser usado para
          todos os demais campos de texto e até mesmo para novos textos. No
          total, foram anotados manualmente 14.315 ocorrências de{" "}
          <em>frames</em> e 12.248 de elementos destes <em>frames</em> em 2.862
          sentenças.
        </p>
        <p dir="ltr">
          Para a anotação automática dos campos de texto, foi treinada uma
          variação do sistema <strong>LOME</strong> <a href="#ref7">[7]</a> – um
          modelo de Inteligência Artificial projetado para identificar
          estruturas em textos –, utilizando anotações manuais de{" "}
          <em>frames</em> recém-anotadas para os domínios de Violência e Saúde e
          anotações já existentes para domínios gerais. No total, foram
          utilizadas 12.294 sentenças anotadas para esse treinamento, com 2.635
          sendo utilizadas para validação e outras 2.635 para teste.
        </p>
        <p dir="ltr">
          Com o modelo LOME treinado, foi possível extrair os <em>frames</em> e
          seus elementos para cada sentença presente nos campos de texto do
          e-SUS APS e do Sinan. No total, o modelo anotou automaticamente
          19.325.013 de sentenças da base pareada, identificando 59.198.796
          frames e 38.214.588 elementos desses frames.
        </p>
        <h2 dir="ltr">Representação semântica de registros do e-SUS APS</h2>
        <p dir="ltr">
          Como um dos objetivos desse projeto é a identificação de potenciais
          casos de violência com base nos registros da atenção básica, focou-se
          na construção de características semânticas para os registros do
          e-SUS, considerando seus campos textuais. Para cada registro, a
          representação semântica consiste em uma sequência de transformações
          baseadas no conteúdo dos 7 campos de texto livre (subjetivo, objetivo,
          avaliação, plano e 3 campos relacionados à encaminhamentos) que
          compõem um atendimento na atenção primária. A primeira etapa consiste
          em identificar as anotações automáticas do LOME para cada sentença dos
          campos textuais.
        </p>
        <p dir="ltr">
          Em seguida, um segundo algoritmo é usado para identificar, com base
          nas anotações automáticas feitas pelo LOME (IA treinada para anotação
          semântica), as unidades lexicais dentro da sentença. Essa etapa é
          importante para algumas representações porque os <em>frames</em> e
          seus elementos caracterizam uma situação de maneira mais geral, mas em
          certas situações pode ser necessário que a representação tenha maior
          granularidade. Por exemplo, o frame <strong>Medicamentos</strong>{" "}
          agrupa todos os tipos de fármacos, mas para uma classificação de casos
          de violência é importante saber se a unidade lexical que evocou esse
          frame foi
          <strong>ansiolítico</strong> ou <strong>analgésico</strong>.
        </p>
        <p dir="ltr">
          As anotações automáticas de sentenças geradas pelo LOME, junto com as
          respectivas unidades lexicais, são transformadas em vetores de
          <em>features</em> (ou vetores de características). Um vetor de{" "}
          <em>features</em> pode ser entendido como uma lista onde cada posição
          representa uma certa característica (por exemplo um frame semântico) e
          possui um valor. No caso das representações semânticas desse projeto,
          cada posição do vetor representa um <em>frame</em>, elemento de{" "}
          <em>frame</em>, unidade lexical, ou a co-ocorrência entre duas dessas
          características . O valor de cada posição representa o número de vezes
          em que cada <em>features</em> ocorreu em um determinado atendimento.
          Por exemplo, na frase “Paciente relata agressão por parte do marido”,
          esse vetor de <em>features</em> deve ter a contagem 1 para os{" "}
          <em>frames</em> <strong>Pessoa por condição em saúde</strong>{" "}
          (paciente), <strong>Causar dano</strong>
          (agressão) e <strong>Relações pessoais</strong> (marido). Também 1
          para os elementos
          <strong>Paciente</strong> (paciente), <strong>Agressor</strong>{" "}
          (marido), <strong>Vítima</strong> (paciente),{" "}
          <strong>Parceiro 1</strong>
          (paciente) e <strong>Parceiro 2</strong> (marido). Por fim, a contagem
          também deve ser 1 para as co-ocorrências entre{" "}
          <strong>Paciente</strong>, <strong>Parceiro 1</strong> e{" "}
          <strong>Vítima</strong>, já que a paciente representa simultaneamente
          todos esses elementos, e <strong>Agressor</strong>e{" "}
          <strong>Parceiro 2</strong>, representados pelo marido. Nesse exemplo,
          todas as
          <em>features</em> citadas tem frequência igual, mas quando se
          considera todo o conjunto de sentenças de um prontuário, há uma
          tendência de que elas se repitam. Considere, por exemplo, quantas
          vezes o substantivo
          <strong>paciente</strong> ou o verbo <strong>relatar</strong> aparecem
          em um prontuário. Portanto, é importante capturar de maneira mais
          geral as frequências dessas características semânticas em um
          determinado prontuário a fim de estimar sua importância.
        </p>
        <p dir="ltr">
          A próxima etapa consiste em aplicar, para cada um dos vetores de
          <em>features</em>, a técnica de <strong>TF-IDF</strong> (
          <em>Term Frequency-Inverse Document Frequency</em>). A primeira vista,
          a frequência de uma certa característica pode parecer um bom indicador
          de sua importância. Isto é, os <em>frames</em>
          mais importantes apareceriam mais vezes. Porém, é importante
          considerar que certas palavras ou características podem ser frequentes
          simplesmente por serem comuns em muitos contextos e não
          necessariamente porque são relevantes para distinguir um significado
          específico (vide os já mencionados <strong>paciente</strong> e{" "}
          <strong>relatar</strong>). A ideia do TF-IDF é realizar esse tipo de
          ponderação. Dessa forma, a técnica enfatiza termos mais
          representativos do conteúdo semântico dos campos abertos, contribuindo
          para uma representação mais discriminativa e útil dos registros. Os
          vetores transformados por TF-IDF são utilizados na próxima etapa de
          processamento.
        </p>
        <p dir="ltr">
          A última etapa na construção de representações semânticas é a{" "}
          <strong>Análise de Componentes Principais</strong> (PCA). O objetivo
          dessa etapa é a redução do tamanho dos vetores de <em>features</em>.
          Apesar de os <em>frames</em> agregarem várias palavras em uma única
          estrutura, e por isso serem muito menos variáveis do que a língua em
          sua forma pura, os vetores de <em>features</em>
          ainda possuem um número de dimensões (isto é, o seu tamanho) elevado
          para certas aplicações de aprendizado de máquina / inteligência
          artificial. Mesmo após operações básicas de pré-processamento, cada um
          dos vetores possuía 34.132 <em>features</em>, compostas por{" "}
          <em>frames</em>, seus elementos, unidades lexicais e principalmente as
          co-ocorrências entre essas diferentes estruturas. Após a aplicação do
          PCA, novos vetores são gerados, e suas posições representam
          combinações entre as características originais. Esses vetores possuem
          apenas <strong>500 dimensões</strong>, uma redução de mais de{" "}
          <strong>68 vezes</strong> do tamanho original, preservando 78,4% da
          variância, um valor considerado bom para sistemas de PLN. A ideia do
          PCA é justamente comprimir informações consideradas redundantes e que
          pouco diferenciam prontuários entre si.
        </p>
        <p dir="ltr">
          Com a aplicação de todas essas etapas, foram obtidos os vetores de
          <em>features</em> de todos os registros do e-SUS APS. Esses vetores
          servem como conjunto de treinamento para o modelo de identificação de
          possíveis casos de violência.
        </p>
        <h2 dir="ltr">
          Treinando o modelo para a identificação de casos de violência
        </h2>
        <p dir="ltr">
          Os modelos de aprendizado de máquina supervisionado requerem, para o
          seu treinamento, a existência de um conjunto de dados devidamente
          rotulados. Para a tarefa de identificação de casos com padrão de
          violência, o conjunto deve ser composto de vetores de{" "}
          <em>features</em>
          semântica, representando registros de um dos SIS pareados e um rótulo
          identificando se o registro possui relação com um caso de violência ou
          não. Como os registros do e-SUS APS não são, em princípio, sobre
          violência, estabelecer essa causalidade é uma tarefa árdua. Mesmo com
          as linhas da vida de mulheres reconstruídas pelo pareamento de dados
          em diferentes sistemas, não é possível estabelecer de maneira
          automática e sistemática a relação entre, por exemplo, uma visita a
          uma UBS e uma hospitalização. Por conta disso, foram definidas regras
          de aproximação para uma pré-classificação de registros a fim de se
          construir um conjunto de treinamento. Essas regras organizaram os
          registros em alguns grupos distintos:
        </p>
        <ul>
          <li dir="ltr">
            <p dir="ltr">
              <strong>notificação de violência</strong>: campo de descrição de
              fichas do Sinan. A ideia é que esses textos capturem padrões
              explícitos de violência.
            </p>
          </li>
          <li dir="ltr">
            <p dir="ltr">
              <strong>atendimentos da AP próximos a data de violência</strong>:
              quando existe um registro do e-SUS APS até três dias antes ou
              depois de uma notificação de violência. Nesses casos, assume-se
              que há uma causalidade entre os dois eventos (atendimento e
              violência).
            </p>
          </li>
          <li dir="ltr">
            <p dir="ltr">
              <strong>
                atendimentos da AP com padrões semânticos de violência
              </strong>
              : como todas as sentenças do e-SUS APS foram anotadas para
              estruturas semânticas pelo sistema LOME, pode-se identificar via
              estruturas conhecidas a priori registros em que a menção a uma
              violência. Por exemplo, a presença do <em>frame</em> de Violência
              com a presença do elemento Agressor ou o <em>frame</em> de
              Tentativa onde o <strong>Objetivo</strong> é o<em>frame</em>{" "}
              <strong>Matar</strong> para casos de tentativa de suicídio.
            </p>
          </li>
          <li dir="ltr">
            <p dir="ltr">
              <strong>
                atendimentos da AP próximos a hospitalização ou óbito por
                violência (interpessoal ou autoprovocada)
              </strong>
              : quando um atendimento da AP está próximo de um registro de
              hospitalização ou óbito em que fica evidente que a causa foi
              alguma violência, também se assume que há relação desse
              atendimento com a violência.
            </p>
          </li>
        </ul>
        <p dir="ltr">
          A tabela a seguir apresenta as contagens para cada um desses
          diferentes tipos de registros usados no conjunto de treinamento para
          exemplificar casos de textos relacionados a alguma violência:
        </p>
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Tipos de registros associados à VDG</th>
                <th>n</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Notificação violência autoprovocada</td>
                <td>3.570</td>
              </tr>
              <tr>
                <td>Notificação violência interpessoal</td>
                <td>11.497</td>
              </tr>
              <tr>
                <td>Registro do e-SUS APS próximo à violência autoprovocada</td>
                <td>136</td>
              </tr>
              <tr>
                <td>Registro do e-SUS APS próximo à violência interpessoal</td>
                <td>281</td>
              </tr>
              <tr>
                <td>
                  Registro do e-SUS APS com padrão semântico de violência
                  autoprovocada
                </td>
                <td>2.447</td>
              </tr>
              <tr>
                <td>
                  Registro do e-SUS APS com padrão semântico de violência
                  interpessoal
                </td>
                <td>4.251</td>
              </tr>
              <tr>
                <td>
                  Registro do e-SUS APS próximo à hosp./óbito por viol.
                  autoprovocada
                </td>
                <td>-</td>
              </tr>
              <tr>
                <td>
                  Registro do e-SUS APS próximo à hosp./óbito por viol.
                  interpessoal
                </td>
                <td>-</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p dir="ltr">
          Como em algumas situações, um registro pode se encaixar em mais de um
          tipo, o número total de registros com texto relacionado a violência
          foi de <strong>22.122</strong>, que é menor que a soma das contagens
          de cada tipo. Outra observação importante é que não foram encontrados
          registros próximos à hospitalizações e óbitos por violência. No
          futuro, esses dados serão mais investigados para garantir que sejam
          considerados. Para os exemplos negativos, foram selecionados
          aleatóriamente registros do e-SUS APS que não estavam em nenhum dos
          grupos considerados como registros com padrão de violência e com
          códigos CID-10 comumente relacionados à condições de saúde com pouca
          ou nenhuma relação com violência (por exemplo, doenças congênitas). No
          total, foram considerados <strong>62.484</strong> registros para o
          conjunto de treinamento como o rótulo de não relacionado a violência.
        </p>
        <p dir="ltr">
          Com o conjunto de treinamento definido, a próxima etapa foi a escolha
          de um modelo de aprendizado de máquina. Considerando a natureza das
          representações semânticas dos registros (vetores de <em>features</em>{" "}
          textuais baseados em frequência) e a tarefa de identificação de casos
          de violência, os melhores candidatos são modelos de aprendizado de
          máquina projetados para a classificação. Nas tarefas de classificação,
          o modelo aprende a classificar qualquer registro em duas ou mais
          classes. No caso, as classes são “possui padrão de violência” e “não
          possui padrões de violência”.
        </p>
        <p dir="ltr">
          Neste projeto optamos por usar um modelo do tipo conhecido por{" "}
          <strong>SVM</strong>(<em>Support Vector Machine</em>). Em suas
          variações lineares, esse tipo de modelo é bastante interpretável: cada
          uma das features recebe um peso (positivo ou negativo) que determina a
          força da relação entre, por exemplo um <em>frame</em>, e os padrões de
          violência (ou não). Esse peso permite estimar a importância de certas
          estruturas do texto para a classificação de registros, o que é
          importante para obtenção de novos conhecimentos sobre o fenômeno da
          VBG.
        </p>
        <p dir="ltr">
          Através de experimentos preliminares, selecionamos como parâmetros de
          treinamentos os valores <strong>C = 5</strong> e a penalização via{" "}
          <strong>L1</strong> e o kernel de tipo <strong>linear</strong>. Esses
          parâmetros foram escolhidos com base nas métricas de <em>recall</em> e{" "}
          <em>F-score</em>. O <em>recall</em> (também conhecido como
          sensibilidade) foi o principal critério de avaliação, pois um valor
          alto indica que o modelo consegue identificar a maioria dos casos
          relacionados à VBG (mesmo que com mais falsos positivos). A lógica por
          trás disso é que é melhor ter falsos positivos para violência de
          gênero do que deixar de identificar casos reais (falsos negativos). O{" "}
          <em>F-score</em> foi utilizado apenas para identificar o ponto de
          retorno decrescente no aumento do
          <em>recall</em>.
        </p>
        <p>
          A tabela abaixo apresenta o resultado de três diferentes métricas do
          modelo, obtidas via <strong>validação cruzada</strong>. Na validação
          cruzada, o conjunto de treinamento foi dividido em 5 partes de tamanho
          igual, o modelo foi treinado com 4 dessas 5 partes e a última era
          usada para avaliar a performance (conjunto de teste). Os resultados
          são as médias de 5 execuções desse processo, variando a parte usada
          como teste. Todas as métricas variam de 0 a 1, sendo 1 um escore
          perfeito.
        </p>
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Métrica</th>
                <th>Resultado</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>F-score</td>
                <td>0.8205 ± 0.002</td>
              </tr>
              <tr>
                <td>
                  <em>Recall</em> (sensibilidade)
                </td>
                <td>0.8976 ± 0.006</td>
              </tr>
              <tr>
                <td>Precisão</td>
                <td>0.7557 ± 0.004</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p dir="ltr">
          Após a validação cruzada, o modelo foi treinado com o conjunto inteiro
          de dados e re-avaliado a fim de equilibrar as métricas: apesar do
          <em>recall</em> alto (o modelo encontra 89,76% dos casos de
          violência), a precisão foi considerada baixa: 1 em cada 4 casos
          avaliados como positivos pelo modelo é um falso positivo. Ao ajustar o
          limite (<em>threshold</em>) de classificação, as métricas do modelo
          final ficam mais equilibradas:
        </p>
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Métrica</th>
                <th>Resultado</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>F-score</td>
                <td>0.8412</td>
              </tr>
              <tr>
                <td>
                  <em>Recall</em> (sensibilidade)
                </td>
                <td>0.8369</td>
              </tr>
              <tr>
                <td>Precisão</td>
                <td>0.8457</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p dir="ltr">
          Apesar do <em>recall</em> menor, o modelo se torna muito mais preciso
          e há uma melhoria generalizada das métricas, já que o F-score
          representa a média harmônica da precisão e da sensibilidade e ela
          aumenta de 0.8205 para 0.8412.
        </p>
        <p dir="ltr">
          Com o modelo treinado, foi realizada uma classificação de todos os
          registros do e-SUS APS que possuíam alguma informação textual e,
          portanto, uma representação semântica. A ideia é buscar, em todos os
          registros, casos de violência potencialmente não identificados, por
          meio de um modelo de IA treinado com um subconjunto menor, mas bem
          definido de treinamento. Cada um dos registros do e-SUS APS recebeu um
          rótulo indicando se ele possuía ou não padrões de violência de acordo
          com o modelo. são disponibilizados por meio de um painel que
          possibilita a visualização e interpretação das informações. O painel é
          dividido em três partes que são apresentadas a seguir
        </p>
        <h2
          id="subnotificacao-violencia-recife"
          className="anchor-target"
          dir="ltr"
        >
          Subnotificação de violência contra mulher no Recife
        </h2>
        <p dir="ltr">
          A subnotificação foi calculada a partir dos registros do e-SUS APS
          classificados pelo modelo de inteligência artificial. Como mencionado
          anteriormente, essa classificação só foi possível porque o modelo foi
          treinado com alguns registros em que havia alta probabilidade de haver
          padrões de violência nos textos, principalmente usando notificações de
          violência e declarações explícitas de violência nos atendimentos da
          atenção básica.
        </p>
        <p dir="ltr">
          Após atribuir uma classificação do modelo treinado para cada registro
          do e-SUS, esses mesmos registros foram agrupados por bairro de
          residência da paciente. A partir disso, pode-se calcular uma
          estimativa de notificação para apoiar a gestão a identificar
          territórios com maior ou menor subnotificação. A taxa de
          subnotificação de um determinado território é dada pela seguinte
          fórmula:
        </p>
        <div className="img-wrapper">
          <img src={FormulaUnderreporting} alt="Formula de Subnotificação" />
        </div>
        <p dir="ltr">
          Onde <strong>Sinan</strong> representa o conjunto de meninas/mulheres
          que possuem uma notificação de violência,{" "}
          <strong>Subnotificados</strong> é o conjunto de meninas/mulheres em
          que se pode ter certeza que houve violência sem notificação (por
          exemplo, menção explicita à violência no prontuário ou óbito por
          agressão) e <strong>Suspeitos</strong> são meninas/mulheres que
          possuem pelo menos um registro em que o modelo de IA classificou como
          contendo padrões relacionados à violência e que não estejam no
          conjunto de casos <strong>Subnotificados</strong> ou
          <strong>Sinan</strong>. Portanto, a ideia é identificar o número de
          casos de suspeita ou de violência confirmada em que não houve
          notificação e dividir esse número pelo número de mulheres que são
          usuárias da AP no território. Uma taxa de 10% indicaria que até 10%
          das usuárias da APS no território possuem sinais relacionados à
          violência em seus prontuários.
        </p>
        <h2 id="padroes-no-tempo" className="anchor-target " dir="ltr">
          Padrões de registros ao longo do tempo
        </h2>
        <p dir="ltr">
          O procedimento de <em>linkage</em> permite a reconstrução das
          trajetórias de mulheres pelo sistema público de saúde em uma “linha da
          vida”, marcada pelos registros em diferentes sistemas.
        </p>
        <p dir="ltr">
          Essas linhas são essenciais tanto para a compreensão dos eventos de
          forma individualizada, como para a compreensão dos padrões de
          violência ao longo do tempo. Para este segundo fim, essas trajetórias
          precisam ser agrupadas e a população feminina precisa ser observada em
          sua totalidade.
        </p>
        <p dir="ltr">
          Para isso, alinhamos as linhas da vida com base na data de ocorrência
          da violência, indicada na ficha de notificação do Sinan de cada
          mulher, e alteramos o eixo horizontal do gráfico para representar a
          diferença entre o dia em que o sistema de saúde toma conhecimento
          dessa violência (o dia da notificação ou quando a violência é
          explicitamente mencionada em um prontuário, detectada via padrões
          semânticos) e o dia em que essa mulher recebeu atendimentos na atenção
          primária.
        </p>
        <p dir="ltr">
          O gráfico pode, então, ser transformado em um histograma com a
          contagem do número de atendimentos com certa diferença em dias para o
          dia da violência. Apesar de já revelar um padrão, esse gráfico
          apresenta um problema: o número absoluto de atendimentos pode variar,
          a depender da região do município e outros fatores.
        </p>
        <p dir="ltr">
          Para apresentar uma medida facilmente interpretável, o eixo vertical
          do gráfico foi transformado em uma medida de desvio da normalidade de
          atendimentos de uma mulher, o <em>z-score</em>. Para isso, é
          necessário estimar o que seria um número normal de visitas utilizando
          uma técnica de aproximação, que permite simular várias linhas da vida
          sorteando aleatoriamente o dia dos atendimentos em relação ao dia em
          que o sistema de saúde descobre a violência. Quando esse processo é
          realizado aleatoriamente, os dados tendem a se distribuir
          uniformemente, revelando uma linha de base.
        </p>
        <p dir="ltr">
          Comparando a distribuição real com a distribuição de normalidade,
          temos o gráfico que quantifica o tamanho do desvio dos atendimentos em
          relação ao esperado. A curva foi suavizada para facilitar a
          interpretação dos resultados. Como resultado, temos os gráficos que
          mostram o padrão de visitas antes e depois que a violência fica
          explícita para as diferentes faixas etárias.
        </p>
        <h2 dir="ltr">Léxico da Violência de Gênero</h2>
        <p dir="ltr">
          Nos estudos da Linguística de Corpus, o conceito de{" "}
          <strong>chave</strong> é utilizado com frequência para representar
          palavras, expressões ou outras estruturas que melhor representem um
          determinado conjunto de textos escritos. Esse tipo de técnica é
          utilizada neste estudo para identificar os itens lexicais que melhor
          representam a violência de gênero nos campos textuais do e-SUS APS.
          Pode-se pensar na ideia de “identificar as palavras-chave dos
          registros do e-SUS APS de mulheres e meninas sobreviventes ou vítimas
          de violência de gênero” com o objetivo de entender a relação da
          violência em si com sintomas, medicamentos e outros elementos do
          domínio da saúde.
        </p>
        <p dir="ltr">
          A primeira etapa desse tipo de análise é a organização de todos os
          campos abertos abertos relevantes do e-SUS APS em dois conjuntos de
          texto: um contendo apenas textos de mulheres e meninas que possuem uma
          notificação no Sinan (ou padrões semânticos de violência) e outro para
          todas as mulheres. Cada um desses conjuntos é chamado de{" "}
          <em>corpus</em>. Essa separação é importante porque um termo só pode
          ser chave de um <em>corpus</em>
          quando comparado a outro. Isso ocorre porque se um conjunto fosse
          analisado individualmente, a única medida seria uma contagem de
          palavras, o que não destaca, necessariamente, as palavras mais
          relevantes para representar os textos. Por exemplo, artigos e
          conjunções são muito mais frequentes, mas pouco informativos.
          Portanto, para essa análise, o foco está no <em>corpus</em> de
          mulheres e meninas que possuem uma notificação, enquanto o{" "}
          <em>corpus</em> de toda a população é usado como referência. Em outras
          palavras, os textos da puopulação inteira estabelecem uma linha de
          normalidade e as diferenças do <em>corpus</em> focal para esse normal
          são justamente as características que o melhor identificam.
        </p>
        <p dir="ltr">
          Para realizar esse tipo de análise, todos os termos do <em>corpus</em>{" "}
          foco (prontuários de meninas e mulheres sobreviventes ou vítimas) são
          ranqueados através de uma medida de escore chamada keyness, ou
          Relevância. O escore de relevância de um termo nada mais é do que uma
          medida do quão importante o termo é para representar um{" "}
          <em>corpus</em>. Ela deve ser lida como “o item X é Y vezes mais/menos
          frequente no <em>corpus</em>
          foco do que no <em>corpus</em> de referência”. Neste estudo, foi
          utilizado o método <em>simple maths</em> <a href="#ref8">[8]</a> que
          se baseia nas frequências do termo dentro do <em>corpus</em> para
          obter a relevância:
        </p>
        <div className="img-wrapper">
          <img src={FormulaKeyness} alt="Formula de keyness" />
        </div>
        <p dir="ltr">
          Onde{" "}
          <em>
            freq<sub>f</sub>
          </em>{" "}
          é a frequência por milhão do termo no <em>corpus</em> foco
          (prontuários de meninas e mulheres com notificação no Sinan ou com
          padrão semântico de violência em prontuário do e-SUS APS) e{" "}
          <em>
            freq<sub>r</sub>
          </em>{" "}
          é a frequência por milhão do termo no <em>corpus</em> de referência
          (prontuários de toda população). A fórmula é simplesmente a razão do
          número de ocorrências do termo para sobreviventes e vítimas em relação
          à população geral. A soma de 1 serve apenas para evitar divisões por
          zero. Portanto, um escore de relevância de 7 indicaria que o termo em
          questão apareceu 7 vezes mais nos prontuários de meninas e mulheres
          que sofreram violência. Quando o valor é apresentado negativo, o termo
          é X vezes menos frequente nesses mesmos registros médicos. Na
          visualização do painel, esses valores foram convertidos em
          porcentagens de aumento ou diminuição da frequência do item para o
          grupo em questão.
        </p>
        <br />
        <h2>Referências</h2>
        <ol className="references">
          <li id="ref1">
            <a
              href="https://www.scielosp.org/article/rsp/2016.v50/49/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Oliveira, G. P. D., Bierrenbach, A. L. D. S., Camargo Júnior, K.
              R. D., Coeli, C. M., & Pinheiro, R. S. (2016). Accuracy of
              probabilistic and deterministic record linkage: the case of
              tuberculosis.
              <i>Revista de saude publica, 50</i>, 49.
            </a>
          </li>
          <li id="ref2">
            Fillmore, C. J. (1982). Frame semantics. In: Linguistic Society of
            Korea (ed.), “Linguistics in The Morning Calm”. Seoul: Hanshin,
            p.111–138.
          </li>
          <li id="ref3">
            Pustejovsky, James. (1998). <i>The generative lexicon</i>. MIT
            Press.
          </li>
          <li id="ref4">
            Costa, A. D. (2020). A tradução por máquina enriquecida
            semanticamente com frames e papéis qualia (Doctoral dissertation,
            Ph. D. thesis in Linguistics. Universidade Federal de Juiz de Fora,
            Juiz de Fora).
          </li>
          <li id="ref5">
            <a
              href="https://sol.sbc.org.br/index.php/stil/article/view/25468"
              target="_blank"
              rel="noopener noreferrer"
            >
            Dutra, L., Lorenzi, A., Larré, L., Belcavello, F., Matos, E.,
            Pestana, A., ... & Torrent, T. (2023, September). Building a
            Frame-Semantic Model of the Healthcare Domain: Towards the
            identification of gender-based violence in public health data. In
            Simpósio Brasileiro de Tecnologia da Informação e da Linguagem
            Humana (STIL) (pp. 338-346). SBC.
            </a>
          </li>
          <li id="ref6">
            <a
              href="https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2022.838441/full"
              target="_blank"
              rel="noopener noreferrer"
            >
              Torrent, T. T., Matos, E. E. D. S., Belcavello, F., Viridiano, M.,
              Gamonal, M. A., Costa, A. D. D., & Marim, M. C. (2022).
              Representing context in framenet: A multidimensional, multimodal
              approach.
              <i>Frontiers in Psychology, 13</i>, 838441.
            </a>
          </li>
          <li id="ref7">
            <a
              href="https://arxiv.org/abs/2101.12175"
              target="_blank"
              rel="noopener noreferrer"
            >
              Xia, P., Qin, G., Vashishtha, S., Chen, Y., Chen, T., May, C., ...
              & Van Durme, B. (2021). LOME: Large ontology multilingual
              extraction. <i>arXiv preprint arXiv:2101.12175</i>.
            </a>
          </li>
          <li id="ref8">
            <a
              href="https://www.sketchengine.eu/wp-content/uploads/2015/04/2009-Simple-maths-for-keywords.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Kilgarriff, A. (2009, July). Simple maths for keywords. In{" "}
              <i>Proceedings of the Corpus Linguistics Conference</i> (Vol. 6).
              Liverpool: University of Liverpool.
            </a>
          </li>
        </ol>

        <br />
      </div>
    </section>
  );
}

export default TechnicalNote;
